import { useState, useCallback, ReactNode } from "react";
import {
  FormDataContext,
  type UserFormData,
  type InvoiceDataItem,
} from "../contexts/FormDataContext";

/**
 * Provider para recolectar datos de formularios
 * Guarda temporalmente los datos ingresados por el usuario
 * sin enviarlos a ningún servicio (para desarrollo UI)
 */

export const FormDataProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<UserFormData>({
    pymeData: undefined,
    investorData: undefined,
    empresaData: undefined,
    invoiceData: [],
  });

  const updatePymeData = useCallback(
    (data: Partial<UserFormData["pymeData"]>) => {
      setFormData((prev) => ({
        ...prev,
        pymeData: { ...prev.pymeData, ...data },
      }));
      console.log("📝 PyME Data Updated:", data);
    },
    [],
  );

  const updateInvestorData = useCallback(
    (data: Partial<UserFormData["investorData"]>) => {
      setFormData((prev) => ({
        ...prev,
        investorData: { ...prev.investorData, ...data },
      }));
      console.log("📝 Investor Data Updated:", data);
    },
    [],
  );

  const updateEmpresaData = useCallback(
    (data: Partial<UserFormData["empresaData"]>) => {
      setFormData((prev) => ({
        ...prev,
        empresaData: { ...prev.empresaData, ...data },
      }));
      console.log("📝 Empresa Data Updated:", data);
    },
    [],
  );

  const addInvoiceData = useCallback((invoice: InvoiceDataItem) => {
    setFormData((prev) => ({
      ...prev,
      invoiceData: [...(prev.invoiceData || []), invoice],
    }));
    console.log("📄 Invoice Added:", invoice);
  }, []);

  const clearFormData = useCallback(() => {
    setFormData({});
    console.log("🗑️ Form Data Cleared");
  }, []);

  const getFormDataSnapshot = useCallback(() => {
    console.log("📸 Form Data Snapshot:", formData);
    return formData;
  }, [formData]);

  return (
    <FormDataContext.Provider
      value={{
        formData,
        updatePymeData,
        updateInvestorData,
        updateEmpresaData,
        addInvoiceData,
        clearFormData,
        getFormDataSnapshot,
      }}
    >
      {children}
    </FormDataContext.Provider>
  );
};
