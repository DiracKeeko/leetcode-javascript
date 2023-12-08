function flatArray(arr) {
  let res = [];
  arr.forEach(item => {
    if (Array.isArray(item)) {
      res = res.concat(flatArray(item));
    } else {
      res.push(item)
    }
  })
  return res;
}

const nestedArray = [1, [2, [3, 4]], 5, [6]];
const flattenedArray = flatArray(nestedArray);
console.log(flattenedArray); // [1, 2, 3, 4, 5, 6]