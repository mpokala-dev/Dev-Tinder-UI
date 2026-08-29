export const handleSearch = (arrList, searchStr, searchBy = "title") => {
  console.log("arrList ", arrList);
  if (!searchStr || searchStr == "") return arrList;
  return arrList.filter((item) =>
    item[searchBy].toLowerCase().includes(searchStr.toLowerCase()),
  );
};
