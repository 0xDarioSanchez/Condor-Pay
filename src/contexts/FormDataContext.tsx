import { createContext } from "react";

export interface InvoiceDataItem {
  invoiceNumber?: string;
  amount?: string;
  issueDate?: string;
  dueDate?: string;
  description?: string;
  status?: string;
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
