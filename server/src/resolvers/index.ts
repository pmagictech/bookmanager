import pubsub from "../pubSub.js";
import { bookMutation, bookQuery } from "./book.js";
import { userQuery, userMutation } from "./user.js";


export default {
  Query: {
    ...bookQuery,
    ...userQuery
  },
  Mutation: {
    ...bookMutation,
    ...userMutation,
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
    userAdded: {
      subscribe: () => pubsub.asyncIterator(["USER_ADDED"]),
    },
  },
};
