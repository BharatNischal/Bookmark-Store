import React, {
  useContext,
} from 'react';
import Bookmark from './bookmark';
import { BookmarkContext } from '../contexts/bookmark';

const BookmarkList: React.FC<{enableModal: any}> = (props) => {
  const { bookmarks } = useContext(BookmarkContext);

  if (bookmarks && bookmarks.length > 0) {
    return (
      <>
        {bookmarks.map((bookmark, i) => (
          <Bookmark
            key={bookmark._id}
            data={bookmark}
            color={i % 2 === 1}
            enableModal={props.enableModal}
          />
        ))}
      </>
    );
  }
  return (
    <tr>
      <td>Empty</td>
      <td>Empty</td>
      <td>Empty</td>
    </tr>
  );
};

export default BookmarkList;
