export const DATE_SELECTS = {
  month: [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ],
  day: Array.from({ length: 31 }, (_, i) => ({
    value: `${i + 1}`,
    label: `${i + 1}`,
  })),
  year: Array.from({ length: 101 }, (_, i) => {
    const year = (new Date().getFullYear() - 18) - i;
    return { value: `${year}`, label: `${year}` };
  }),
};