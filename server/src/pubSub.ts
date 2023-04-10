import { PostgresPubSub } from "@originlabs/graphql-postgres-subscriptions-retry";


const pubsub = new PostgresPubSub({
  topics: ["BOOK_ADDED","USER_ADDED"]
});
await pubsub.connect();

export default pubsub;
