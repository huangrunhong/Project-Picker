import { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import UserContext from "../contexts/UserContext";
import User from "../types/User";
import AuthorizationContext from "../contexts/AuthorizationContext";
import fetchUser from "../services/fetchUser";

type UserContextProviderProps = {
  children: React.ReactNode;
};

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [accessToken] = useContext(AuthorizationContext);

  useEffect(() => {
    if (!accessToken) return;

    const decoded = jwtDecode(accessToken);

    fetchUser(decoded.sub ?? "", setUser);
  }, [accessToken, setUser]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
