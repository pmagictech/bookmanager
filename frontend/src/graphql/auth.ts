import { gql } from "@apollo/client";
import { query } from "./fetcher";

export async function Login (email: string, password: string): Promise<string> {
  const { getToken } = await query(
    gql`
      query GetToken($email: String!, $password: String!) {
        getToken(email: $email, password: $password) {
          code
          message
          success
          token
        }
      }
    `,
    { email, password }
  );

  if(getToken.success){
    return getToken.token;
  }
  else {
    throw new Error(getToken.message);
  }
}

export async function SignUp (name: string, email: string, password: string): Promise<string> {
  const { addUser } = await query(gql`
    mutation AddUser {
      addUser(name: $name, email: $email, password: $password) {
        code
        message
        success
        token
      }
    }
  `, { name, email, password });

  if(addUser.success){
    return addUser.token;
  }
  else {
    throw new Error(addUser.message);
  }
}

export async function GetUser(): Promise<any> {
  const { currentUser } = await query(gql`
    query GetUser {
      currentUser {
        id
        name
        email
      }
    }
  `);

  if(currentUser){
    return currentUser;
  }
}