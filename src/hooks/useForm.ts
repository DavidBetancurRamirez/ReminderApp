import { useCallback, useState } from "react";

type Update<T> = { 
  key: keyof T; 
  value: T[keyof T];
};

export const useForm = <T extends object>(initialState: T) => {
  const [form, setForm] = useState<T>(initialState);

  const handleChange = useCallback((update: Update<T>) => {
    const { key, value } = update;
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const handleReset = useCallback(() => {
    setForm(initialState);
  }, [initialState]);

  return { form, handleChange, handleReset };
};
