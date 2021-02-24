// 给你一个字符串 s，找到 s 中最长的回文子串。

var longestPalindrome = function (str) {
  if (str.length === 1 || str === "") {
    return str;
  }
  let len = str.length;
  // 开始位置
  let startIds = 0;
  let maxLen = 0;
  let maxItem = "";
  // 如果字符串剩余长度小于最大回文字符串，就不执行了
  for (let i = 0; i < len; i++) {
      
  }
  while (len - startIds > maxLen) {
    for (let i = len - 1; i > 0; i--) {
      let curentStr = str.substring(startIds, i + 1);
      if (isPalindrome(curentStr)) {
        maxLen = i - startIds;
        maxItem = curentStr;
        break;
      }
    }
    if (maxItem) {
      break;
    }
    startIds++;
  }
  return maxItem;
};

// 首先要有一个用来判断是不是回文的方法
var isPalindrome = function (str) {
  let len = str.length;
  // 取出中位数
  let middle = parseInt(len / 2);
  for (let i = 0; i < middle; i++) {
    if (str[i] !== str[len - i - 1]) {
      return false;
    }
  }
  return true;
};

console.log(longestPalindrome("abada"));
console.log(longestPalindrome("cbbd"));
console.log(longestPalindrome("ac"));
