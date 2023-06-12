import { formatResponse, MATCH_ACCOUNT, CREATE_ACCOUNT } from '../cypher.js'
import { executeCypher } from '../neo4j.js'

export const getAccountByEmail = async (email) => {
  const resultObject = await executeCypher(MATCH_ACCOUNT, {
    email,
  })
  const result = formatResponse(resultObject)
  return result[0]
}

export const createAccount = async ({ email, salt, hash }) => {
  const resultObject = await executeCypher(CREATE_ACCOUNT, {
    email,
    salt,
    hash,
  })
  const result = formatResponse(resultObject)
  return result[0]
}
