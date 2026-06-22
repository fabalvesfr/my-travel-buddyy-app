import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema/typeDefs.js";
import { resolvers } from "./resolvers/index.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const PORT = parseInt(process.env.PORT ?? "4000", 10);

const { url } = await startStandaloneServer(server, {
  listen: { port: PORT },
});

console.log(`GraphQL server running at: ${url}`);
