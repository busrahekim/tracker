const useGetDateString = (selectedDate: Date) => {
  const normalizeDate = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const selectedDateNormalized = normalizeDate(new Date(selectedDate));
  const selectedDateString = formatDate(selectedDateNormalized);

  return { selectedDateNormalized, selectedDateString };
};

export default useGetDateString;
