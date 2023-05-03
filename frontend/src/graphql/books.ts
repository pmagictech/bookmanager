import { gql } from "@apollo/client";
import { query, mutate } from "./fetcher";

export async function Books(): Promise<string> {
  const { books } = await query(gql`
    query GetBooks {
      books {
        code
        message
        success
        books
      }
    }
  `);

  if (books.success) {
    return books.books;
  } else {
    throw new Error(books.message);
  }
}

export async function AddBook(title: string, author: string, date: string, coverImage?: File): Promise<string> {
  const { addBook } = await mutate(
    gql`
      mutation Mutation($title: String!, $author: String!, $date: String!, $coverImage: Upload!) {
        addBook(title: $title, author: $author, date: $date, cover_image: $coverImage) {
          code
          message
          success
          book {
            title
            author
            date
          }
        }
      }
    `,
    {
      title,
      author,
      date,
      coverImage
    }
  );

  if (addBook.success) {
    return addBook.message;
  } else {
    throw new Error(addBook.message);
  }
}

export function UploadBook(title: string, author: string, date: string, coverImage: File) {
  const body = new FormData();
  body.set('title', title);
  body.set('author', author);
  body.set('date', date);
  body.set('coverImage', coverImage);

  return fetch("/api/upload-book", {
    method: "POST",
    headers: {
      token: localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_KEY || "") || "",
    },
    body,
  }).then((res) => res.json());
}
