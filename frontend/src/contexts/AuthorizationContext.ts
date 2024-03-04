import { createContext } from "react";

type AuthorizationContextState = [
  string | undefined,
  (accessToken: string | undefined) => void
];

const AuthorizationContext = createContext<AuthorizationContextState>([
  undefined,
  () => {},
]);

export default AuthorizationContext;
