export const isPageNumberSearchParamValid = (param: string | null): boolean => {
  if (param === null) return false
  if (!/^\d+$/.test(param)) return false
  if (isNaN(parseInt(param))) return false
  if (parseInt(param) < 1) return false
  return true
}
