import neo4j from 'neo4j-driver'
import dotenv from 'dotenv'

dotenv.config()

export const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD),
  {
    maxConnectionLifetime: 3 * 60 * 60 * 1000, // 3 hours
    maxConnectionPoolSize: 50,
    connectionAcquisitionTimeout: 2 * 60 * 1000, // 120 seconds
    disableLosslessIntegers: true,
  }
)

//For single queries
//Transactions must be used when running multiple statements
export const executeCypher = async (statement, params = {}) => {
  const session = driver.session()
  try {
    const result = await session.run(statement, params)
    return result
  } catch (error) {
    throw error
  } finally {
    session.close()
  }
}
