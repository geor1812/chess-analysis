import express from 'express'

import { getOpeningByFen, getFenResponses } from '../data/openingsData.js'

export const router = express.Router()

router.get('/:fen', async (req, res) => {
  try {
    const opening = await getOpeningByFen(req.params.fen)
    const responses = await getFenResponses(req.params.fen)
    res.json({ opening, responses })
  } catch (error) {
    console.log(error)
  }
})
