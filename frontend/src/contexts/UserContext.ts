import { createContext } from "react";

import User from "../types/User";

type UserContextState = [User | undefined, (user: User | undefined) => void];

const UserContext = createContext<UserContextState>([undefined, () => {}]);

export default UserContext;
