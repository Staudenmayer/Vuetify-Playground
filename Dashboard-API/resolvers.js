const { User } = require("./models/User.js");
const graylog2 = require('graylog2');
const { validate: uuidValidator} = require('uuid');

const logger = new graylog2.graylog({
  servers: [{ host: 'localhost', port: 12201 }], // Replace the "host" per your Graylog domain
  facility: "GraphQL"
});

function parseUser(obj){
  if (obj.hasOwnProperty("_id")) {
    obj.uid = obj._id;
    delete obj._id;
  }
  return obj;
}

// GraphQL Resolvers
const resolvers = {
  Query: {
    users: async () => {
      logger.log("Query users");
      return await User.find({});
    }, // return array of students
    user: async (parent, args) => {
      const { uuid } = args;
      if (!uuidValidator(uuid)) {
        logger.warn(`Failed to query User because of invalid UUID ${uuid}`, parseUser(args))
        throw new Error(`Failed to query User because of invalid UUID ${uuid}`);
      }
      logger.log("Queried User", parseUser(args));
      return await User.findOne(args)
    }, // return student by id
  },
  Mutation: {
    create: async (parent, args) => {
      const { uuid, age } = args;
      if (!uuidValidator(uuid)) {
        logger.warn(`Failed to create User because of invalid UUID ${uuid}`, parseUser(args))
        throw new Error(`Failed to create User because of invalid UUID ${uuid}`);
      }
      const newUser = new User({
        uuid,
        age
      }).save();
      if (!newUser) {
        logger.warn("Failed to create User", parseUser(args));
        throw new Error(`Failed to create User`);
      }
      logger.log("Created User", parseUser(newUser));
      return newUser;
    },
    update: async (parent, args) => {
      const { uuid } = args;
      if (!uuidValidator(uuid)) {
        logger.warn(`Failed to update User because of invalid UUID ${uuid}`, parseUser(args))
        throw new Error(`Failed to update User because of invalid UUID ${uuid}`);
      }
      let updateUser = await User.findOneAndUpdate({uuid: uuid}, parseUser(args));
      if (!updateUser) {
        logger.warn("Failed to update User", args);
        throw new Error(`Student with UUID ${uuid} not found`);
      }
      updateUser = await User.findOne({uuid: uuid});
      logger.log("Updated User", parseUser(updateUser));
      return updateUser;
    },
    delete: async (parent, args) => {
      const { uuid } = args;
      if (!uuidValidator(uuid)) {
        logger.warn(`Failed to delete User because of invalid UUID ${uuid}`, parseUser(args))
        throw new Error(`Failed to delete User because of invalid UUID ${uuid}`);
      }
      let deleteUser = await User.findOneAndDelete(args);
      if (!deleteUser) {
        logger.warn("Failed to delete User", parseUser(args));
        throw new Error(`Student with ID ${id} not found`);
      }
      deleteUser = await User.findOne({uuid: uuid});
      logger.log("Deleted User", parseUser(deleteUser));
      return deleteUser;
    },
  },
};

module.exports = { resolvers };