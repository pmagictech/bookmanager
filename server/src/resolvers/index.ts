import pubsub from "../pubSub.js";
import { books, addBook } from "./book.js";
import { user, addUser } from "./user.js";


export default {
  Query: {
    books,
    user,
  },
  Mutation: {
    addBook,
    addUser,
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
