import { useState, SyntheticEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@src/styles/Home.module.css";

import { Login } from "@src/graphql/auth";
import Layout from "@src/components/Layout";


export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      const token = await Login(email, password);

      localStorage.setItem(process.env.NEXT_PUBLIC_TOKEN_KEY || "", token);

      router.push("/home");
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <Layout>
      <main>
        <section className={styles.hero}>
          <img
            srcSet="assets/home/homepage_promos/reading_challenge_2023/HomepageMasthead_Mobile@2x.png 2x"
            src="https://s.gr-assets.com/assets/home/homepage_promos/reading_challenge_2023/HomepageMasthead_Mobile-21a29f49013e11646004a03ab1e085e2.png"
            alt="Homepagemasthead mobile"
          />
          <h2 className="text-center text-xl my-4 font-bold">Meet your next favorite book.</h2>
          <p className="text-center">
            Find and read more books you'll love. Be part of Goodreads, the world's largest community for readers like you.
          </p>
          <form className="mt-8 space-y-3" onSubmit={handleLogin}>
            <h2 className="text-2xl font-bold text-center">Sign in</h2>
            <label className="block">
              <span className="text-gray-700">Email</span>
              <input
                type="email"
                name="email"
                className="mt-1 block w-full rounded-full border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Password</span>
              <input
                type="password"
                name="password"
                className="mt-1 block w-full rounded-full border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <div>
              <div className="text-red-700 mt-8 text-center">{error}</div>
              <button className="mt-3 w-full rounded-full bg-black text-white py-3">Sign in</button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <span>
              Not a member?{" "}
              <Link className="text-teal-700" href="/sign-up">
                Sign up
              </Link>
            </span>
          </div>
        </section>
      </main>
    </Layout>
  );
}
