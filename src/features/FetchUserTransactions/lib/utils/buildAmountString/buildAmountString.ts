export function buildAmountString(amount: number, currency?: string) {
  const amountString = amount.toLocaleString().replace(/,/g, ' ')
  if (currency) {
    return `${amountString} ${currency}`
  }
  return amountString
}
