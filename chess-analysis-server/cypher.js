export const formatResponse = (resultObj) => {
  const result = []
  if (resultObj.records.length > 0) {
    resultObj.records.map((record) => {
      let fields = {}
      for (let i = 0; i < record._fields.length; i++) {
        fields = { ...fields, ...record._fields[i].properties }
      }
      result.push(fields)
    })
  }
  return result
}

export const CREATE_OPENING_WITH_FEN = `
MERGE (o:Opening {name: $name})
MERGE (f:Fen {fen: $fen})
WITH o,f
MERGE (o)-[:DESCRIBES]-(f)
`

export const MATCH_OPENING_BY_FEN = `
MATCH (opening :Opening)--(fen: Fen)
WHERE fen.fen = $fen
RETURN opening
`

export const CREATE_FEN_PGN_WITH_PREV = `
MERGE (fen: Fen {fen: $fen})
MERGE (pgn: Pgn {pgn: $pgn})
MERGE (prevFen: Fen {fen: $prevFen})
MERGE (prevPgn: Pgn {pgn: $prevPgn})
WITH fen, pgn, prevFen, prevPgn
MERGE (prevFen)-[fenLeadsTo:FEN_LEADS_TO]-(fen)
ON CREATE SET fenLeadsTo.count = 1
ON MATCH SET fenLeadsTo.count = fenLeadsTo.count + 1
MERGE (prevPgn)-[pgnLeadsTo:PGN_LEADS_TO]-(pgn)
ON CREATE SET pgnLeadsTo.count = 1
ON MATCH SET pgnLeadsTo.count = fenLeadsTo.count + 1
MERGE (pgn)-[:TRANSLATES_TO]-(fen)
`

export const MATCH_FEN_RESPONSES = `
MATCH (f1: Fen {fen: $fen})-[r:FEN_LEADS_TO]->(f2: Fen)
WITH f2, r
MATCH (o: Opening)-[:DESCRIBES]->(f2)<-[:TRANSLATES_TO]-(p: Pgn)
RETURN f2, r, p, o
ORDER BY r.count DESC
LIMIT $limit;
`

export const MATCH_ACCOUNT = `
MATCH (a: Account {email: $email}) RETURN a
`

export const CREATE_ACCOUNT = `
CREATE (a: Account {email: $email, salt: $salt, hash: $hash}) RETURN a
`
