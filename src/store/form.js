import { create } from "zustand";

export const useFormStore = create((set) => ({
  form: null,

  setForm: (form) => {
    set((state) => ({ form: { ...state.form, ...form } }));
  },

  resetForm: () => {
    set(() => ({ form: null }));
  },
}));
