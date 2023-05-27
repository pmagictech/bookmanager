import { Tab } from "@headlessui/react";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";

import { useUser } from "@src/hooks";

import Layout from "@src/components/Layout";
import { useEffect, useState } from "react";
import Table from "@src/components/Table";
import Loading from "@src/components/Loading";

const QUERY = gql`
  query GetBook {
    books {
      title
      author
      coverImage
      date
    }
  }
`;

export default function Home() {
  const { isLoading, isLoggedIn } = useUser();
  const router = useRouter();
  const { data, loading } = useQuery(QUERY, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  if (!isLoggedIn && !isLoading) {
    router.push("/");
  }

  if (!isLoggedIn || loading) {
    return <Loading />;
  }

  const categories = ["Want to Read", "Reading", "Read"];

  return (
    <Layout>
      <main>
        <div className="container max-w-3xl mx-auto">
          <div className="px-2 py-8 sm:px-0">
            <Tab.Group
              onChange={(index) => {
                console.log("Changed selected tab to:", index);
              }}
            >
              <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                {categories.map((category) => (
                  <Tab
                    key={category}
                    className={({ selected }) =>
                      `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 focus:outline-none ${
                        selected ? "bg-white shadow" : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                      }`
                    }
                  >
                    {category}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="mt-5">
                <Tab.Panel className="rounded-xl p-3 focus:outline-none">
                  <Table books={data?.books ?? []} />
                </Tab.Panel>
                <Tab.Panel>Content 2</Tab.Panel>
                <Tab.Panel>Content 3</Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </main>
    </Layout>
  );
}
