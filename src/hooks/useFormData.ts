import { use } from "react";
import { FormDataContext } from "../contexts/FormDataContext";

/**
 * Hook para acceder al contexto de datos de formularios
 *
 * Ejemplo de uso en un componente:
 *
 * ```tsx
 * const { updatePymeData, formData } = useFormData();
 *
 * const handleInputChange = (e) => {
 *   updatePymeData({ [e.target.name]: e.target.value });
 * };
 * ```
 */
export const useFormData = () => {
  const context = use(FormDataContext);

  if (!context) {
    throw new Error("useFormData must be used within a FormDataProvider");
  }

  return context;
};
