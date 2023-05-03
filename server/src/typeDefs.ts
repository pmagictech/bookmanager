export default `#graphql

  type Book {
    title: String
    author: String
    coverImage: String
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

  type GetTokenResponse {
    code: String!
    success: Boolean!
    message: String!
    token: String
  }

  type Query {
    books(title: String, author: String, date: DateFilter): [Book]
    user(id: ID!): User
    currentUser: User
    getToken(email: String!, password: String!): GetTokenResponse
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
    addBook(title: String!, author: String!, date: String!, coverImage: String!): BookUpdateResponse
    addUser(name: String!, email: String!, password: String!): GetTokenResponse
  }

  type Subscription {
    bookAdded: Book
    userAdded: User
  }
`;
