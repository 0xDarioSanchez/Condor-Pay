import type {
  InvoiceDataItem,
  InvoiceStatus,
} from "@/contexts/FormDataContext";

const STORAGE_KEY = "condorpay_invoices";

/**
 * Servicio para gestionar facturas
 * Usa localStorage por ahora, fácil de migrar a backend después
 */

export class InvoiceService {
  /**
   * Obtiene todas las facturas del storage
   */
  static getAll(): InvoiceDataItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? (JSON.parse(data) as InvoiceDataItem[]) : [];
    } catch (error) {
      console.error("Error loading invoices:", error);
      return [];
    }
  }

  /**
   * Obtiene una factura por ID
   */
  static getById(id: string): InvoiceDataItem | null {
    const invoices = this.getAll();
    return invoices.find((inv) => inv.id === id) || null;
  }

  /**
   * Obtiene facturas por estado
   */
  static getByStatus(status: InvoiceStatus): InvoiceDataItem[] {
    const invoices = this.getAll();
    return invoices.filter((inv) => inv.status === status);
  }

  /**
   * Crea una nueva factura
   */
  static create(
    invoice: Omit<InvoiceDataItem, "id" | "uploadDate">,
  ): InvoiceDataItem {
    const invoices = this.getAll();

    const newInvoice: InvoiceDataItem = {
      ...invoice,
      id: this.generateId(),
      uploadDate: new Date().toISOString(),
    };

    invoices.push(newInvoice);
    this.saveAll(invoices);

    console.log("📄 Invoice Created:", newInvoice);
    return newInvoice;
  }

  /**
   * Actualiza una factura existente
   */
  static update(
    id: string,
    updates: Partial<InvoiceDataItem>,
  ): InvoiceDataItem | null {
    const invoices = this.getAll();
    const index = invoices.findIndex((inv) => inv.id === id);

    if (index === -1) {
      console.error("Invoice not found:", id);
      return null;
    }

    invoices[index] = { ...invoices[index], ...updates };
    this.saveAll(invoices);

    console.log("✏️ Invoice Updated:", invoices[index]);
    return invoices[index];
  }

  /**
   * Actualiza el estado de una factura
   */
  static updateStatus(
    id: string,
    status: InvoiceStatus,
  ): InvoiceDataItem | null {
    return this.update(id, { status });
  }

  /**
   * Agrega una oferta a una factura
   */
  static addOffer(
    id: string,
    offer: InvoiceDataItem["offer"],
  ): InvoiceDataItem | null {
    return this.update(id, {
      offer,
      status: "offer_pending",
    });
  }

  /**
   * Tokeniza una factura (acepta la oferta)
   */
  static tokenize(
    id: string,
    tokenId: string,
    transactionHash: string,
  ): InvoiceDataItem | null {
    return this.update(id, {
      status: "tokenized",
      tokenId,
      transactionHash,
      tokenizedDate: new Date().toISOString(),
    });
  }

  /**
   * Elimina una factura
   */
  static delete(id: string): boolean {
    const invoices = this.getAll();
    const filtered = invoices.filter((inv) => inv.id !== id);

    if (filtered.length === invoices.length) {
      return false; // No se encontró
    }

    this.saveAll(filtered);
    console.log("🗑️ Invoice Deleted:", id);
    return true;
  }

  /**
   * Calcula estadísticas de facturas
   */
  static getStats() {
    const invoices = this.getAll();

    return {
      total: invoices.length,
      byStatus: {
        draft: invoices.filter((i) => i.status === "draft").length,
        validating: invoices.filter((i) => i.status === "validating").length,
        validated: invoices.filter((i) => i.status === "validated").length,
        offer_pending: invoices.filter((i) => i.status === "offer_pending")
          .length,
        tokenized: invoices.filter((i) => i.status === "tokenized").length,
        funded: invoices.filter((i) => i.status === "funded").length,
        completed: invoices.filter((i) => i.status === "completed").length,
        rejected: invoices.filter((i) => i.status === "rejected").length,
      },
      totalAmount: invoices.reduce((sum, inv) => sum + inv.amount, 0),
      totalFunded: invoices
        .filter((i) => i.status === "funded" || i.status === "completed")
        .reduce((sum, inv) => sum + (inv.netAmount || inv.amount), 0),
    };
  }

  /**
   * Limpia todas las facturas (útil para desarrollo)
   */
  static clearAll(): void {
    localStorage.removeItem(STORAGE_KEY);
    console.log("🗑️ All invoices cleared");
  }

  // Métodos privados

  private static saveAll(invoices: InvoiceDataItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
    } catch (error) {
      console.error("Error saving invoices:", error);
    }
  }

  private static generateId(): string {
    return `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

/**
 * Función helper para calcular la oferta de financiamiento
 */
export function calculateInvoiceOffer(
  amount: number,
  dueDate: string,
  payerRating: string = "A",
  pymRating: string = "B",
): InvoiceDataItem["offer"] {
  // Calcula días hasta vencimiento
  const now = new Date();
  const due = new Date(dueDate);
  const days = Math.ceil(
    (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );

  // Tasa base según rating
  const ratingRates: Record<string, number> = {
    AA: 2.5,
    A: 3.5,
    B: 5.0,
    C: 7.5,
  };

  const baseRate =
    (ratingRates[payerRating] || 5.0) + (ratingRates[pymRating] || 5.0);
  const rate = Math.min(baseRate / 2, 10); // Promedio, máximo 10%

  // Calcula descuento
  const discount = (amount * rate) / 100;
  const receivable = amount - discount;

  return {
    rate,
    term: days,
    discount,
    receivable,
  };
}

/**
 * Función helper para validar una factura
 * (Simula validación, en producción conectaría con API de SUNAT)
 */
export function validateInvoice(invoiceData: Partial<InvoiceDataItem>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!invoiceData.invoiceNumber) {
    errors.push("Número de factura requerido");
  }

  if (!invoiceData.issuerRuc || invoiceData.issuerRuc.length !== 11) {
    errors.push("RUC emisor inválido");
  }

  if (!invoiceData.payerRuc || invoiceData.payerRuc.length !== 11) {
    errors.push("RUC pagador inválido");
  }

  if (!invoiceData.amount || invoiceData.amount <= 0) {
    errors.push("Monto inválido");
  }

  if (!invoiceData.dueDate) {
    errors.push("Fecha de vencimiento requerida");
  } else {
    const dueDate = new Date(invoiceData.dueDate);
    if (dueDate <= new Date()) {
      errors.push("Fecha de vencimiento debe ser futura");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
