import React, {createContext,useState} from 'react';

export const UserContext = createContext();

const UserContextProvider = (props)=>{
  const [user,setUser] = useState({login:false,username:"",name:""});
  return(
    <UserContext.Provider value={{user,setUser}}>
    {props.children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
