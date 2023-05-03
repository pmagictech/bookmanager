import { useEffect, useState } from 'react';
import { User } from "@src/types";
import { GetUser } from "@src/graphql/auth";


export function useUser() {
  const [isLoading, setIsLoading ] = useState(true);
  const [isLoggedIn, setIsLoggedIn ] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setIsLoading(true);

    GetUser().then(user => {
      setUser(user);
      setIsLoggedIn(user ? true : false);
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
      setIsLoggedIn(false);
    });
  }, []);

  return { isLoading, isLoggedIn, user };
}