import { useEffect, useState } from "react";

import AuthorizationContext from "../contexts/AuthorizationContext";

type AuthorizationContextProviderProps = {
  children: React.ReactNode;
};

const AuthorizationContextProvider = ({
  children,
}: AuthorizationContextProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);

  const fetchToken = async () => {
    const params: RequestInit = {
      method: "POST",
      credentials: "include",
    };

    const response = await fetch("/api/users/refreshToken", params);
    const { result } = await response.json();

    setAccessToken(result.newAccessToken);
  };

  const setToken = async (accessToken: string | undefined) => {
    try {
      if (!accessToken) {
        return setAccessToken(undefined);
      }

      setAccessToken(accessToken);
      setInterval(fetchToken, 1000 * 60 * 45);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);
  return (
    <AuthorizationContext.Provider value={[accessToken, setToken]}>
      {children}
    </AuthorizationContext.Provider>
  );
};

export default AuthorizationContextProvider;
