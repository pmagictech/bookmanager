import Head from "next/head";

export default function Layout({ title, desc, children }: any) {
  return (
    <>
      <Head>
        <title>{title ?? "Goodreads | Meet your next favorite book"}</title>
        <meta
          name="description"
          content={
            desc ??
            "Find and read more books you'll love, and keep track of the books you want to read. Be part of the world's largest community of book lovers on Goodreads."
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="bg-stone-200">
        <div className="container mx-auto p-3">
          <img
            alt="Goodreads: Book reviews, recommendations, and discussion"
            src="https://s.gr-assets.com/assets/home/header_logo-8d96d7078a3d63f9f31d92282fd67cf4.png"
          />
        </div>
      </header>
      {children}
    </>
  );
}
