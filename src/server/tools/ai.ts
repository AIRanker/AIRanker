export const currentTime = async () => {
  const date = new Date()
  return date.toISOString()
}
