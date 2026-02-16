import { createContext } from "react";

export type InvoiceStatus =
  | "draft"
  | "validating"
  | "validated"
  | "offer_pending"
  | "tokenized"
  | "funded"
  | "completed"
  | "rejected";

export interface InvoiceDataItem {
  // Identificación
  id: string;
  invoiceNumber: string;
  fileName?: string;
  fileType?: "xml" | "pdf";

  // Emisor (PyME)
  issuerRuc: string;
  issuerName?: string;

  // Pagador (Empresa)
  payerRuc: string;
  payerName: string;
  payerRating?: string;

  // Montos
  amount: number;
  currency: string;
  discountRate?: number;
  discountAmount?: number;
  netAmount?: number;

  // Fechas
  issueDate: string;
  dueDate: string;
  uploadDate?: string;
  tokenizedDate?: string;

  // Descripción
  description?: string;

  // Estado y tracking
  status: InvoiceStatus;

  // Oferta de financiamiento
  offer?: {
    rate: number;
    term: number; // días
    discount: number;
    receivable: number; // Lo que recibirá la PyME
  };

  // Blockchain
  tokenId?: string;
  transactionHash?: string;

  // Metadata adicional
  sector?: string;
  validatedAt?: string;
  metadata?: Record<string, string | number | boolean | null>;
}

export interface UserFormData {
  // Datos de la PyME
  pymeData?: {
    businessName?: string;
    rfc?: string;
    address?: string;
    phone?: string;
    email?: string;
    walletAddress?: string;
  };

  // Datos del Inversionista
  investorData?: {
    fullName?: string;
    email?: string;
    phone?: string;
    investmentAmount?: string;
    riskProfile?: string;
    walletAddress?: string;
  };

  // Datos de la Empresa
  empresaData?: {
    companyName?: string;
    rfc?: string;
    sector?: string;
    contactEmail?: string;
    contactPhone?: string;
    walletAddress?: string;
  };

  // Datos de facturas
  invoiceData?: InvoiceDataItem[];
}

export interface FormDataContextType {
  formData: UserFormData;
  updatePymeData: (data: Partial<UserFormData["pymeData"]>) => void;
  updateInvestorData: (data: Partial<UserFormData["investorData"]>) => void;
  updateEmpresaData: (data: Partial<UserFormData["empresaData"]>) => void;
  addInvoiceData: (invoice: InvoiceDataItem) => void;
  clearFormData: () => void;
  getFormDataSnapshot: () => UserFormData;
}

export const FormDataContext = createContext<FormDataContextType | undefined>(
  undefined,
);
