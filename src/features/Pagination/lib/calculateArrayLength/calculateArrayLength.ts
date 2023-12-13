// Calculate the length of the array of the middle parts of page numbers to display in the pagination component

export function calculateArrayLength(visibleMiddlePageCount: number, totalPageCount: number): number {
  // If the total page count without first and last page is less than or equal to the visible middle page count, return it
  return Math.min(visibleMiddlePageCount, totalPageCount - 2)
}
