export function findOne(arr, ref) {
  if (!arr) return arr;
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    if (arr.id == ref.id) arr[i] = ref;
  }
  return arr;
}
