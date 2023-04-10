export default `
  type Book {
    title: String
    author: String
    date: String
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  input BetweenFilter {
    from: String!
    to: String!
  }

  input DateFilter {
    eq: String
    between: BetweenFilter
  }

  type Query {
    books(title: String, author: String, date: DateFilter): [Book]
    user(id: ID!): User
  }

  type BookUpdateResponse {
    code: String!
    success: Boolean!
    message: String!
    book: Book
  }

  type UserUpdateResponse {
    code: String!
    success: Boolean!
    message: String!
    user: User
  }

  type Mutation {
    addBook(title: String, author: String): BookUpdateResponse
    addUser(name: String!, email: String!, password: String!): UserUpdateResponse
  }

  type Subscription {
    bookAdded: Book
    userAdded: User
  }
`;
