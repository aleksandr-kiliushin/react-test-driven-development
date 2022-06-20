export const createFetchSuccessfulResponse = (body?: unknown) => {
  return Promise.resolve({
    async json() {
      return Promise.resolve(body)
    },
    ok: true,
  })
}

export const createFetchErrorResponse = ({ body, status }: { body: any; status: number }) => {
  return Promise.resolve({
    async json() {
      return Promise.resolve(body)
    },
    ok: false,
    status,
  })
}

export const getRequestBodyOf = (fetchSpy: jest.Mock) => {
  return JSON.parse(fetchSpy.mock.calls[0][1].body)
}
