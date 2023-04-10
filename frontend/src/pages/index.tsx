import Link from "next/link";
import styles from "@/styles/Home.module.css";

import Layout from "@/components/Layout";

export default function Home() {
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
          <form className="mt-8 space-y-3" action="">
            <h2 className="text-2xl font-bold text-center">Sign in</h2>
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
              <button className="mt-8 w-full rounded-full bg-black text-white py-3">Sign in</button>
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
