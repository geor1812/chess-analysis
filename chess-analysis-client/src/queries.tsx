import utf8 from 'utf8'
import base64 from 'base-64'

export const getOpeningAndResponsesByFen = async (fen: string) => {
  const bytes = utf8.encode(fen)
  const encodedFen = base64.encode(bytes)
  const res = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/openings/${encodedFen}`
  )
  return res.json()
}
