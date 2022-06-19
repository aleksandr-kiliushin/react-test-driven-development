export const createFetchSuccessfulResponse = (body: unknown) => {
  return Promise.resolve({
    ok: true,
    async json() {
      return Promise.resolve(body)
    },
  })
}

export const createFetchErrorResponse = () => {
  return Promise.resolve({ ok: false })
}
