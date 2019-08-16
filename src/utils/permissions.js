
// eslint-disable-next-line import/prefer-default-export
export const actionToObject = (json) => {
  try {
    return JSON.parse(json)
  } catch (e) {
    console.log('err', e.message)
  }
  return []
}
