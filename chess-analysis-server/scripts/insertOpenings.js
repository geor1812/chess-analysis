import process from 'node:process'
import { tsvParse } from 'd3-dsv'
import { getGlobals } from 'common-es'
import fs from 'fs'
import path from 'path'

import { driver } from '../neo4j.js'
import { createOpeningWithPgn } from '../cypher.js'

const { __dirname } = getGlobals(import.meta.url)

const tsvData = fs.readFileSync(path.join(__dirname, '../data/a.tsv'))

const session = driver.session()

try {
  await session.executeWrite((trx) => {
    tsvParse(tsvData.toString(), async (d) => {
      await trx.run(createOpeningWithPgn, {
        name: d.name,
        pgn: d.pgn,
      })
      return d
    })
  })
} catch (error) {
  console.log(error)
} finally {
  session.close()
}

process.exit()
