export const logError = (error: unknown, location: string) => {
  console.error(`Произошла ошибка в ${location}`)
  console.error(error)
}
