import { createContext, useCallback, useEffect, useState } from "react";
import pb from "@/lib/pb";
import type { StateUpdater, Dispatch } from "preact/hooks";

const setLoggedinUser: Dispatch<StateUpdater<string>> = () => {};

const UserContext = createContext({
  loggedinUser: "",
  userId: "",
  setLoggedinUser,
});

export const UserProvider = ({ children }) => {
  const [loggedinUser, setLoggedinUser] = useState("");
  const [userId, setUserid] = useState("");

  const updateLoggedinUser = useCallback(() => {
    if (pb.authStore.model) {
      setLoggedinUser(pb.authStore.model.username);
      setUserid(pb.authStore.model.id);
    } else {
      setLoggedinUser("");
      setUserid("");
    }
  }, []);

  useEffect(() => {
    updateLoggedinUser();
  }, [updateLoggedinUser]);

  return (
    <UserContext.Provider value={{ loggedinUser, userId, setLoggedinUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
