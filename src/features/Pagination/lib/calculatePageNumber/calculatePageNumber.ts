export function calculatePageNumber(
  totalPageCount: number,
  visibleMiddlePageCount: number,
  currentPage: number,
  index: number,
  hasLeftEllipsis: boolean,
  hasRightEllipsis: boolean,
): number {
  if (hasLeftEllipsis && hasRightEllipsis) {
    return currentPage - 1 + index
  } else if (hasRightEllipsis) {
    return index + 2
  }
  return (
    totalPageCount
    - (Math.min(visibleMiddlePageCount, totalPageCount - 2) - index)
  )
}
