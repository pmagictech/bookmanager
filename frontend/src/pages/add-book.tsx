import { useRouter } from "next/router";
import { SyntheticEvent, useContext, useRef, useState } from "react";

import Layout from "@src/components/Layout";
import Loading from "@src/components/Loading";
import { IMessageContext, Message } from "@src/context/MessageContext";
import { UploadBook } from "@src/graphql/books";
import { useUser } from "@src/hooks";
import styles from "@src/styles/Home.module.css";

export default function AddBookPage() {
  const { isLoading, user } = useUser();
  const router = useRouter();

  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const { openMessage } = useContext(Message) as IMessageContext;

  const [error, setError] = useState("");

  if (!user && !isLoading) {
    router.push("/");
  }

  if (!user) {
    return <Loading />;
  }

  const handleAddBook = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const title = titleRef.current?.value;
    const author = authorRef.current?.value;
    const date = dateRef.current?.value;
    const image = imageRef.current?.files ? imageRef.current.files[0] : undefined;

    try{
      if(!image)
        return setError("Please add the cover image.");

      if(!title)
        return setError("Please add the book title.");

      if(!author)
        return setError("Please add the book author.");

      if(!date)
        return setError("Please add the book date.");


      await UploadBook(title, author, date, image);
      openMessage("Success", "Book has been added").then(() => router.push("/home"));
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <Layout>
      <main>
        <section className={styles.hero}>
          <form action="" method="post" className="mt-12 space-y-3" onSubmit={handleAddBook}>
            <h2 className="text-2xl font-bold text-center">Add Book</h2>
            <label className="block">
              <span className="text-gray-700">Title</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-full border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name="title"
                ref={titleRef}
                required
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Author</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-full border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name="author"
                ref={authorRef}
                required
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Date</span>
              <input
                type="date"
                className="mt-1 block w-full rounded-full border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name="date"
                ref={dateRef}
                required
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Cover image</span>
              <input
                type="file"
                accept="image/*"
                className="mt-1 block w-full border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                ref={imageRef}
                required
              />
            </label>
            <div>
              <div className="text-red-700 mt-8 text-center">{error}</div>
              <button className="mt-3 w-full rounded-full bg-black text-white py-3">Submit</button>
            </div>
          </form>
        </section>
      </main>
    </Layout>
  );
}