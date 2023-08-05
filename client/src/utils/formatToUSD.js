export default function formatToUSD(number) {
  return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}