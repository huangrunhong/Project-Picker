import { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import UserContext from "../contexts/UserContext";
import User from "../types/User";
import AuthorizationContext from "../contexts/AuthorizationContext";

type UserContextProviderProps = {
  children: React.ReactNode;
};

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [accessToken] = useContext(AuthorizationContext);

  useEffect(() => {
    if (!accessToken) return;

    const decoded = jwtDecode(accessToken);

    const fetchUser = async () => {
      const response = await fetch(`/api/users/${decoded.sub}/profile/`);
      const { result } = await response.json();

      console.log(result);

      setUser(result);
    };

    fetchUser();
  }, [accessToken, setUser]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
