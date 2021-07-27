import React, {
  createContext, Dispatch, SetStateAction, useState,
} from 'react';

export type UserInterface = {
  login: boolean;
  username: string;
  name: string;
};

interface UserContextInterface {
  user: UserInterface;
  setUser: Dispatch<SetStateAction<UserInterface>>
}

const defaultUser = { login: false, username: '', name: '' };

const defaultValue = {
  user: defaultUser,
  setUser: () => {},
};

export const UserContext = createContext<UserContextInterface>(defaultValue);

const UserContextProvider: React.FC<{}> = ({ children }) => {
  const [user, setUser] = useState(defaultUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
