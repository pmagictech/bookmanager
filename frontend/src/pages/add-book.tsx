import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/router";

import { useUser } from "@src/hooks";
import styles from "@src/styles/Home.module.css";
import Layout from "@src/components/Layout";
import { AddBook, UploadBook } from "@src/graphql/books";
import Loading from "@src/components/Loading";

export default function AddBookPage() {
  const { isLoading, user } = useUser();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState<File>();

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

    try{
      if(!image)
        return setError("Please add the cover image.");

      const data = await UploadBook(title, author, date, image);

    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <Layout>
      <main>
        <section className={styles.hero}>
          <form className="mt-12 space-y-3" onSubmit={handleAddBook}>
            <h2 className="text-2xl font-bold text-center">Add Book</h2>
            <label className="block">
              <span className="text-gray-700">Title</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-full border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Author</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-full border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Date</span>
              <input
                type="date"
                className="mt-1 block w-full rounded-full border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Cover image</span>
              <input
                type="file"
                accept="image/*"
                className="mt-1 block w-full border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={e => setImage(e.target.files ? e.target.files[0] : undefined)}
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