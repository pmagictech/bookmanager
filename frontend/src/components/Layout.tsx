import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { IMessageContext, Message } from "@src/context/MessageContext";
import { useUser } from "@src/hooks";
import { useContext } from "react";
import Modal from "./Modal";

export default function Layout({ siteTitle, desc, children }: any) {
  const { user, isLoggedIn } = useUser();
  const router = useRouter();

  const { title, type, message, isOpen, closeMessage } = useContext(Message) as IMessageContext;

  const Logout = () => {
    localStorage.removeItem(process.env.NEXT_PUBLIC_TOKEN_KEY || "");
    location.href = "/";
  };

  return (
    <>
      <Head>
        <title>{siteTitle ?? "Goodreads | Meet your next favorite book"}</title>
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
        <div className="container mx-auto p-3 sm:flex justify-between items-end">
          <Link href="/">
            <img
              alt="Goodreads: Book reviews, recommendations, and discussion"
              src="https://s.gr-assets.com/assets/home/header_logo-8d96d7078a3d63f9f31d92282fd67cf4.png"
            />
          </Link>
          {isLoggedIn ? (
            <div className="flex">
              <div className="py-2 px-3 text-sm">{user?.name}</div>
              <Link
                className={`py-2 px-3 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ${
                  router.asPath === "/home"
                    ? "shadow bg-white/[0.4] hover:bg-black/[0.2]"
                    : "hover:bg-white/[0.2] hover:text-neutral-700"
                }`}
                href="/home"
              >
                Home
              </Link>
              <Link
                className={`py-2 px-3 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ${
                  router.asPath === "/add-book"
                    ? "shadow bg-white/[0.4] hover:bg-black/[0.2]"
                    : "hover:bg-white/[0.2] hover:text-neutral-700"
                }`}
                href="/add-book"
              >
                Add Book
              </Link>
              <button
                type="button"
                className={`py-2 px-3 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 hover:bg-white/[0.2] hover:text-neutral-700`}
                onClick={Logout}
              >
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </header>
      {children}
      <Modal
        title={title}
        type={type}
        isOpen={isOpen}
        message={message}
        closeModal={closeMessage}
      />
    </>
  );
}
