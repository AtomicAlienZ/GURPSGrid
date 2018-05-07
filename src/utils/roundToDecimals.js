export default function roundToDecimals (num, decimals = 4) {
  const powTen = 10 ** decimals;
  return Math.round(num * powTen) / powTen;
}
