export function move<T>(arr: (T | undefined)[], previousIndex: number, currentIndex: number) {
  arr = [...arr];
  while (previousIndex < 0) {
    previousIndex += arr.length;
  }
  while (currentIndex < 0) {
    currentIndex += arr.length;
  }
  if (currentIndex >= arr.length) {
    let k = currentIndex - arr.length;
    while ((k--) + 1) {
      arr.push(undefined);
    }
  }
  arr.splice(currentIndex, 0, arr.splice(previousIndex, 1)[0]);
  return arr;
}
