import { OperationVariables } from "@apollo/client";
import { DocumentNode } from "graphql";
import client from "@src/apollo-client";

export function query(query: DocumentNode, variables: OperationVariables = {}) {
  return client.query({
    query,
    variables
  })
  .then(({ data }) => data);
}

export function mutate(mutation: DocumentNode, variables: OperationVariables = {}) {
  return client.mutate({
    mutation,
    variables
  })
  .then(({ data }) => data);
}
