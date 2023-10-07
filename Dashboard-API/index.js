const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const mongoose = require("mongoose");
const { resolvers } = require("./resolvers.js");
const { typeDefs } = require("./models/typeDefs.js");
const graylog2 = require('graylog2');
const logger = new graylog2.graylog({
  servers: [{ host: 'localhost', port: 12201 }], // Replace the "host" per your Graylog domain
  facility: "GraphQL"
});

const MONGO_URI = "mongodb://localhost:27017/student-register";

// Database connection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info(`DB Connected`);
  })
  .catch(err => {
    logger.emergency('DB could not be started', err);
  });

const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server, {
  listen: { port: 19199 },
}).then(({ url }) => {
  logger.info(`Server ready at ${url}`);
});