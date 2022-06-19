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

export const getRequestBodyOf = (fetchSpy: jest.Mock) => {
  return JSON.parse(fetchSpy.mock.calls[0][1].body)
}
