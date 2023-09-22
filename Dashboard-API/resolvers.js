const { Student } = require("./models/Student.js");
const graylog2 = require('graylog2');
const logger = new graylog2.graylog({
  servers: [{ host: 'localhost', port: 12201 }], // Replace the "host" per your Graylog domain
  facility: "GraphQL"
});

// GraphQL Resolvers
const resolvers = {
  Query: {
    hello: () => "Hello from Reflectoring Blog",
    welcome: (parent, args) => {
      return `Hello ${args.name}`
    },
    students: async () => {
      return await Student.find({})
    }, // return array of students
    student: async (parent, args) => {
      return await Student.findById(args.id)
    }, // return student by id
  },
  Mutation: {
    create: async (parent, args) => {
      const { firstName, lastName, age } = args;
      const newStudent = new Student({
        firstName,
        lastName,
        age,
      });
      await newStudent.save();
      return newStudent;
    },
    update: async (parent, args) => {
      const { id } = args;
      const updatedStudent = await Student.findByIdAndUpdate(id, args);
      if (!updatedStudent) {
        throw new Error(`Student with ID ${id} not found`);
      }
      return updatedStudent;
    },
    delete: async (parent, args) => {
      const { id } = args;
      const deletedStudent = await Student.findByIdAndDelete(id);
      if (!deletedStudent) {
        throw new Error(`Student with ID ${id} not found`);
      }
      return deletedStudent;
    },
  },
};

module.exports = { resolvers };