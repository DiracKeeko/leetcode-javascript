var isValidSerialization = function(preorder) {
  const arr = preorder.split(',');
  for (let i = arr.length - 1; i > 1;  i--) {
    if (arr[i] === '#' && arr[i - 1] === '#' && arr[i - 2] !== '#') {
      arr.splice(i - 2, 3, '#');
    }
    console.log(i, "arr->", arr.join(","));
  }
  return arr.length === 1 && arr[0] === '#';
};

const testCase = "9,3,4,#,#,1,#,#,2,#,6,#,#";
console.log(isValidSerialization(testCase));