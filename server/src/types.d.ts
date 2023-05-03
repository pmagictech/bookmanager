export interface User {
  id: string;
  name: string;
  email: string;
}

export interface MyContext {
  user?: User;
  db: any;
}

export interface AddBookArgs {
  title: string;
  author: string;
  date: string;
  coverImage: string;
}
