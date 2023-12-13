export const throttle = (callback: () => void, duration: number) => {
  let isThrottled = false

  return () => {
    if (isThrottled) {
      return
    }

    isThrottled = true

    callback()

    setTimeout(() => {
      isThrottled = false
    }, duration)
  }
}
