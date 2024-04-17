/**
 *
 * @param {number} x
 * @return {boolean}
 */

const isPalindrome = (x: number) => {
  const xString = String(x);
  let variable = "";
  let i = xString.length - 1;

  while (i >= 0) {
    variable += xString[i];
    i--;
  }
  return variable === xString;
};

let x1 = 121;
let x2 = -123;
let x3 = 10;

console.log(isPalindrome(x1));
console.log(isPalindrome(x2));
console.log(isPalindrome(x3));
