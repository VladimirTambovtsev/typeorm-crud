"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const graphql_yoga_1 = require("graphql-yoga");
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User");
const typeDefs = `
  type User {
    id: Int!
    firstName: String!
    lastName: String!
    age: Int!
    email: String!
  }
  type Query {
    hello(name: String): String!
    user(id: Int!): User!
    users: [User!]!
  }
  type Mutation {
    createUser(firstName: String!, lastName: String!, age: Int!, email: String!): User!
    updateUser(id: Int!, firstName: String, lastName: String, age: Int, email: String): Boolean
    deleteUser(id: Int!): Boolean
  }
`;
const resolvers = {
    Query: {
        hello: (_, { name }) => `hello ${name || 'World'}`,
        user: (_, { id }) => User_1.User.findOneById(id),
        users: _ => User_1.User.find()
    },
    Mutation: {
        createUser: (_, args) => User_1.User.create(args).save(),
        updateUser: (_, _a) => __awaiter(this, void 0, void 0, function* () {
            var { id } = _a, args = __rest(_a, ["id"]);
            try {
                User_1.User.updateById(id, args);
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        }),
        deleteUser: (_, { id }) => {
            try {
                User_1.User.removeById(id);
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        }
    }
};
const server = new graphql_yoga_1.GraphQLServer({ typeDefs, resolvers });
typeorm_1.createConnection().then(() => {
    server.start(() => console.log('Server is running on localhost:4000'));
});
//# sourceMappingURL=index.js.map