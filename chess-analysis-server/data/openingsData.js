import neo4j from 'neo4j-driver'

import {
  formatResponse,
  MATCH_OPENING_BY_FEN,
  MATCH_FEN_RESPONSES,
} from '../cypher.js'
import { executeCypher } from '../neo4j.js'

export const getOpeningByFen = async (fen) => {
  const resultObject = await executeCypher(MATCH_OPENING_BY_FEN, {
    fen,
  })
  const result = formatResponse(resultObject)
  return result[0]
}

export const getFenResponses = async (fen, limit = 6) => {
  const resultObject = await executeCypher(MATCH_FEN_RESPONSES, {
    fen,
    limit: neo4j.int(limit),
  })
  const result = formatResponse(resultObject)
  return result
}
