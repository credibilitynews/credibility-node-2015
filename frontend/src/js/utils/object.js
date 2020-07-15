export function arrayize(obj) {
  const arr = [];
  Object.keys(obj).forEach((key) => {
    arr.push(obj[key]);
  });
  return arr;
}
