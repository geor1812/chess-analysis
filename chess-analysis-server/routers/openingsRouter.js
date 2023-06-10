import express from 'express'
import { executeCypher } from '../neo4j.js'
import { formatResponse, getOpeningByPgn } from '../cypher.js'

export const router = express.Router()

router.get('/:pgn', async (req, res) => {
  try {
    const resultObject = await executeCypher(getOpeningByPgn, {
      pgn: req.params.pgn,
    })
    const result = formatResponse(resultObject)
    res.json({ data: result[0] })
  } catch (error) {
    console.log(error)
  }
})
