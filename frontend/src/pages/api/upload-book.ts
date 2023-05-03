import type { NextApiRequest, NextApiResponse } from "next";
import { Formidable, Fields, Files, File } from "formidable";
import { createWriteStream, unlink } from "node:fs";

const GRAPHQL_CONTAINER_URL = "http://server:4000/graphql";

type Data = {
  code: number;
  success: boolean;
  message: string;
  book?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { currentUser } = await fetcher(
    req.headers.token as string,
    `
      query GetUser {
        currentUser {
          id
          name
          email
        }
      }
    `
  );

  console.log("🚀 ~ file: upload-book.ts:29 ~ handler ~ currentUser:", currentUser);
  if(!currentUser){
    console.log("🚀 ~ false:", currentUser);
    return res.status(401).json({ code: 401, success: false, message: "User not authenticated" });
  }

  try {
    const {
      fields: { title, author, date },
      files: { coverImage },
    } = await parseRequest(req);

    const { addBook: { code, message, success, book }} = await fetcher(
      req.headers.token as string,
      `
        mutation Mutation($title: String!, $author: String!, $date: String!, $coverImage: String!) {
          addBook(title: $title, author: $author, date: $date, coverImage: $coverImage) {
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
      { title, author, date: new Date(date as string).getTime().toString(), coverImage: (coverImage as File).newFilename }
    );

    if (!success) {

      return res.status(401).json({ code, success: false, message });
    }

    res.status(200).json({ code, success, message, book });
  }
  catch(error: any) {
    console.error("err", error);
    res.status(500).json({ code: 500, success: false, message: error.message });
  }

}

function parseRequest(req: NextApiRequest) {
  return new Promise<{ fields: Fields; files: Files }>((resolve, reject) => {
    const base = import.meta.url;

    const form = new Formidable({
      keepExtensions: true,
      allowEmptyFiles: false,
      minFileSize: 1024,
      maxFileSize: 5 * 1024 * 1024,
      uploadDir: new URL("../../../public/uploads", base).pathname,
      filter: function ({ mimetype }) {
        return Boolean(mimetype && mimetype.includes("image"));
      },
    });

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);

      resolve({ fields, files });
    });
  });
}

function fetcher(token: string, query: string, variables = {}) {
  return fetch(GRAPHQL_CONTAINER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify({
      query,
      variables
    }),
  })
    .then((res) => res.json())
    .then(({ data, errors }) => {
      if(errors){
        console.error(errors);
        throw new Error(errors);
      }

      return data;
    });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
