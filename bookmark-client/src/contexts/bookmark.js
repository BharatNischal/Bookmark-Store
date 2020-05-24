import React, {createContext,useState} from 'react';

export const BookmarkContext = createContext();

const BookmarkContextProvider = (props)=>{
  const [bookmarks,setBookmarks] = useState([]);
  return(
    <BookmarkContext.Provider value={{bookmarks,setBookmarks}}>
    {props.children}
    </BookmarkContext.Provider>
  );
}

export default BookmarkContextProvider;
