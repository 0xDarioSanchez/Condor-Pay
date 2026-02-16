import { useState, useEffect, useCallback } from "react";
import type {
  InvoiceDataItem,
  InvoiceStatus,
} from "@/contexts/FormDataContext";
import {
  InvoiceService,
  calculateInvoiceOffer,
  validateInvoice,
} from "@/services/invoiceService";

/**
 * Hook para gestionar facturas
 * Proporciona métodos CRUD y sincronización con localStorage
 */
export function useInvoices() {
  const [invoices, setInvoices] = useState<InvoiceDataItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadInvoices = useCallback(() => {
    setLoading(true);
    const data = InvoiceService.getAll();
    setInvoices(data);
    setLoading(false);
  }, []);

  // Cargar facturas al montar
  useEffect(() => {
    loadInvoices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createInvoice = useCallback(
    (invoice: Omit<InvoiceDataItem, "id" | "uploadDate">) => {
      const newInvoice = InvoiceService.create(invoice);
      setInvoices((prev) => [...prev, newInvoice]);
      return newInvoice;
    },
    [],
  );

  const updateInvoice = useCallback(
    (id: string, updates: Partial<InvoiceDataItem>) => {
      const updated = InvoiceService.update(id, updates);
      if (updated) {
        setInvoices((prev) =>
          prev.map((inv) => (inv.id === id ? updated : inv)),
        );
      }
      return updated;
    },
    [],
  );

  const updateStatus = useCallback((id: string, status: InvoiceStatus) => {
    const updated = InvoiceService.updateStatus(id, status);
    if (updated) {
      setInvoices((prev) => prev.map((inv) => (inv.id === id ? updated : inv)));
    }
    return updated;
  }, []);

  const deleteInvoice = useCallback((id: string) => {
    const success = InvoiceService.delete(id);
    if (success) {
      setInvoices((prev) => prev.filter((inv) => inv.id !== id));
    }
    return success;
  }, []);

  const getById = useCallback(
    (id: string) => {
      return invoices.find((inv) => inv.id === id) || null;
    },
    [invoices],
  );

  const getByStatus = useCallback(
    (status: InvoiceStatus) => {
      return invoices.filter((inv) => inv.status === status);
    },
    [invoices],
  );

  return {
    invoices,
    loading,
    createInvoice,
    updateInvoice,
    updateStatus,
    deleteInvoice,
    getById,
    getByStatus,
    refresh: loadInvoices,
  };
}

/**
 * Hook para gestionar una factura individual
 */
export function useInvoice(id: string | null) {
  const [invoice, setInvoice] = useState<InvoiceDataItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setInvoice(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const data = InvoiceService.getById(id);
    setInvoice(data);
    setLoading(false);
  }, [id]);

  const updateInvoice = useCallback(
    (updates: Partial<InvoiceDataItem>) => {
      if (!id) return null;

      const updated = InvoiceService.update(id, updates);
      if (updated) {
        setInvoice(updated);
      }
      return updated;
    },
    [id],
  );

  const updateStatus = useCallback(
    (status: InvoiceStatus) => {
      if (!id) return null;

      const updated = InvoiceService.updateStatus(id, status);
      if (updated) {
        setInvoice(updated);
      }
      return updated;
    },
    [id],
  );

  const addOffer = useCallback(
    (offer: InvoiceDataItem["offer"]) => {
      if (!id) return null;

      const updated = InvoiceService.addOffer(id, offer);
      if (updated) {
        setInvoice(updated);
      }
      return updated;
    },
    [id],
  );

  const tokenize = useCallback(
    (tokenId: string, transactionHash: string) => {
      if (!id) return null;

      const updated = InvoiceService.tokenize(id, tokenId, transactionHash);
      if (updated) {
        setInvoice(updated);
      }
      return updated;
    },
    [id],
  );

  return {
    invoice,
    loading,
    updateInvoice,
    updateStatus,
    addOffer,
    tokenize,
  };
}

/**
 * Hook para estadísticas de facturas
 */
export function useInvoiceStats() {
  const [stats, setStats] = useState(InvoiceService.getStats());

  const refresh = useCallback(() => {
    setStats(InvoiceService.getStats());
  }, []);

  // Actualizar stats cada 5 segundos
  useEffect(() => {
    const interval = setInterval(refresh, 5000);
    return () => clearInterval(interval);
  }, [refresh]);

  return { stats, refresh };
}

/**
 * Hook para calcular oferta de una factura
 */
export function useInvoiceOffer(
  amount: number,
  dueDate: string,
  payerRating?: string,
  pymRating?: string,
) {
  const [offer, setOffer] = useState<InvoiceDataItem["offer"]>();

  useEffect(() => {
    if (amount && dueDate) {
      const calculated = calculateInvoiceOffer(
        amount,
        dueDate,
        payerRating,
        pymRating,
      );
      setOffer(calculated);
    }
  }, [amount, dueDate, payerRating, pymRating]);

  return offer;
}

/**
 * Hook para validar datos de factura
 */
export function useInvoiceValidation(invoiceData: Partial<InvoiceDataItem>) {
  const [validation, setValidation] = useState({
    isValid: false,
    errors: [] as string[],
  });

  useEffect(() => {
    const result = validateInvoice(invoiceData);
    setValidation(result);
  }, [invoiceData]);

  return validation;
}
