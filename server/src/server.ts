import { ApolloServer } from 'apollo-server'
import { createContext } from './context'
import { schema } from './schema'

const server = new ApolloServer({
  schema,
  context: createContext,
})

const PORT = 4000
const HOST = '192.168.1.13'
server
  .listen({ host: HOST, port: PORT })
  .then(({ url }) =>
    console.log(
      `🚀 Server ready at: ${url}\n⭐️ See sample queries: http://pris.ly/e/ts/graphql-auth#using-the-graphql-api`,
    ),
  )
