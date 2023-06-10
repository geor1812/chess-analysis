import process from 'node:process'
import { executeCypherQuery } from '../neo4j.js'

const testQuery = 'MATCH (n) RETURN n'

const result = await executeCypherQuery(testQuery)
console.log(result)

process.exit()
