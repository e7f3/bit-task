export function buildDateString(
  date: Date,
  format?: 'xshort' | 'short' | 'long',
) {
  switch (format) {
    case 'xshort':
      return `${date.getFullYear()}-${date.toLocaleString('ru-RU', {
        month: '2-digit',
      })}`
    case 'short':
      return date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      })
    default:
      return date
        .toLocaleTimeString('ru-RU', {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
        .replaceAll('/', '.')
  }
}
