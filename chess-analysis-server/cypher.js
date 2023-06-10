export const formatResponse = (resultObj) => {
  const result = []
  if (resultObj.records.length > 0) {
    resultObj.records.map((record) => {
      result.push(record._fields[0].properties)
    })
  }
  return result
}

export const createOpeningWithPgn = `CREATE p = (:Opening {name: $name})-[:DESCRIBES]->(:Pgn {pgn:  $pgn})`

export const getOpeningByPgn = `
MATCH (opening :Opening)--(pgn: Pgn)
WHERE pgn.pgn = $pgn
RETURN opening
`
