function getMinMax(str) {
  let result = {};

  let filteredArr = str.split(' ').filter(num => Number(num));
  result.min = Math.min(...filteredArr);
  result.max = Math.max(...filteredArr);

  return result;
}
