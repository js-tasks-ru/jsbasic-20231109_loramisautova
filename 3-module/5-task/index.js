function getMinMax(str) {
  let filteredArr = str.split(' ').filter(num => Number(num));

  return {
    min: Math.min(...filteredArr),
    max: Math.max(...filteredArr)
  };
}
