export const generateKey = (index: number) =>
  String.fromCharCode(index + "A".charCodeAt(0)) + index;
