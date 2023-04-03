import Link from "next/link";
import styles from "@/styles/Home.module.css";

import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout title="Goodreads Registration">
      <main>
        <section className={styles.hero}>
          <form className="mt-12 space-y-3" action="">
            <h2 className="text-2xl font-bold text-center">Create Account</h2>
            <label className="block">
              <span className="text-gray-700">First Name</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-full border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Last Name</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-full border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Email</span>
              <input
                type="email"
                className="mt-1 block w-full rounded-full border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Password</span>
              <input
                type="password"
                className="mt-1 block w-full rounded-full border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <div>
              <button className="mt-8 w-full rounded-full bg-black text-white py-3">Create account</button>
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
