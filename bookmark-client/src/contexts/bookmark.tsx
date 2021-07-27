import React, {
  createContext, Dispatch, SetStateAction, useState,
} from 'react';

export type Bookmark = {
  title: string;
  url: string;
  selection: string;
  // eslint-disable-next-line camelcase
  created_date: Date;
  _id: string;
};

interface BookmarkContextInterface {
  bookmarks: Array<Bookmark>;
  setBookmarks: Dispatch<SetStateAction<Bookmark[]>>
}

const defaultValue = {
  bookmarks: [],
  setBookmarks: () => {},
};

export const BookmarkContext = createContext<BookmarkContextInterface>(defaultValue);

const BookmarkContextProvider: React.FC<{}> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<Array<Bookmark>>([]);

  return (
    <BookmarkContext.Provider value={{ bookmarks, setBookmarks }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkContextProvider;
