import express from 'express'
import utf8 from 'utf8'
import base64 from 'base-64'

import { getOpeningByFen, getFenResponses } from '../data/openingsData.js'

export const router = express.Router()

router.get('/:fen', async (req, res) => {
  try {
    const bytes = base64.decode(req.params.fen)
    const fen = utf8.decode(bytes)
    const opening = await getOpeningByFen(fen)
    const responses = await getFenResponses(fen)
    res.status(200).json({ opening, responses })
  } catch (error) {
    console.log(error)
  }
})
