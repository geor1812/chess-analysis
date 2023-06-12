import process from 'node:process'
import { tsvParse } from 'd3-dsv'
import { getGlobals } from 'common-es'
import fs from 'fs'
import path from 'path'
import { Chess } from 'chess.js'

import { driver } from '../neo4j.js'
import { CREATE_OPENING_WITH_FEN, CREATE_FEN_PGN_WITH_PREV } from '../cypher.js'

const { __dirname } = getGlobals(import.meta.url)

const session = driver.session()

let chess = new Chess()

const tsvData = fs.readFileSync(path.join(__dirname, '../data/e.tsv'))
const parsedData = tsvParse(tsvData.toString(), (d) => {
  return d
})

const extractMoves = (pgn) => {
  const dirtyMoves = pgn.split(' ')
  const moves = dirtyMoves.filter((move) => !move.includes('.'))
  return moves
}

for (let i = 0; i < parsedData.length; i++) {
  const record = parsedData[i]
  const moves = extractMoves(record.pgn)
  chess = new Chess()
  console.log(chess.pgn())
  try {
    await session.executeWrite(async (trx) => {
      let fen = null
      let pgn = null
      let prevFen = null
      let prevPgn = null

      for (let j = 0; j < moves.length; j++) {
        chess.move(moves[j])
        fen = chess.fen()
        pgn = chess.pgn()
        if (prevFen && prevPgn) {
          await trx.run(CREATE_FEN_PGN_WITH_PREV, {
            fen,
            pgn,
            prevFen,
            prevPgn,
          })
        }
        if (j === moves.length - 1) {
          await trx.run(CREATE_OPENING_WITH_FEN, {
            name: record.name,
            fen,
          })
          console.log('Inserted opening', i, record)
        }
        prevFen = fen
        prevPgn = pgn
      }
    })
  } catch (error) {
    console.log(error)
  }
}

session.close()
process.exit()
