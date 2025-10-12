const formatDate = (date: string) => {
  const splitDate = date.split("T")[0].split("-").join(". ");

  return splitDate;
};

export default formatDate;
