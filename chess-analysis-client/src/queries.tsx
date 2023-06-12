export const getOpeningAndResponsesByFen = async (fen: string) => {
  const encodedFen = encodeURIComponent(fen)
  const res = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/openings/${encodedFen}`
  )
  return res.json()
}
