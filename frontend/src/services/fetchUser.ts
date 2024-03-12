import User from "types/User";

const fetchUser = async (id: string, setUser: (user: User) => void) => {
  try {
    const response = await fetch(`/api/users/${id}/profile/`);
    const { result } = await response.json();

    setUser(result);
  } catch (error) {
    console.log(error);
  }
};

export default fetchUser;
