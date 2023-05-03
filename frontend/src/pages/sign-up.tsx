import { SyntheticEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@src/styles/Home.module.css";

import Layout from "@src/components/Layout";
import { SignUp } from "@src/graphql/auth";


export default function Home() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSignUp = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      const token = await SignUp(`${fname} ${lname}`, email, password);

      localStorage.setItem(process.env.NEXT_PUBLIC_TOKEN_KEY || '', token);

      router.push("/");
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <Layout title="Goodreads Registration">
      <main>
        <section className={styles.hero}>
          <form className="mt-12 space-y-3" onSubmit={handleSignUp}>
            <h2 className="text-2xl font-bold text-center">Create Account</h2>
            <label className="block">
              <span className="text-gray-700">First Name</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-full border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Last Name</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-full border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Email</span>
              <input
                type="email"
                className="mt-1 block w-full rounded-full border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Password</span>
              <input
                type="password"
                className="mt-1 block w-full rounded-full border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <div>
              <div className="text-red-700 mt-8 text-center">{error}</div>
              <button className="mt-3 w-full rounded-full bg-black text-white py-3">Create account</button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <span>
              Already have an account?{" "}
              <Link className="text-teal-700" href="/">
                Sign in
              </Link>
            </span>
          </div>
        </section>
      </main>
    </Layout>
  );
}
