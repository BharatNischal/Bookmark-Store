/* eslint-disable no-underscore-dangle */
import React, { SetStateAction, useContext, Dispatch } from 'react';
import axios from 'axios';
import { Bookmark as BM, BookmarkContext } from '../contexts/bookmark';

interface BoomarkProps {
  data: BM,
  color: boolean;
  enableModal: any;
}

const Bookmark: React.FC<BoomarkProps> = (props) => {
  const { data, color, enableModal } = props;
  const { bookmarks, setBookmarks } = useContext(BookmarkContext);

  const deleteBookmark = () => {
    axios.delete(`/api/bookmark/${data._id}`)
      .then((res) => {
        if (res.data.success) {
          setBookmarks(bookmarks.filter((bookmark) => bookmark._id !== props.data._id));
        }
      });
  };

  const showData = () => {
    enableModal(data);
    (document.getElementById('#exampleModal') as any).modal();
  };

  let size;
  if (window.innerWidth < 500) {
    size = 60;
  } else if (window.innerWidth < 750) {
    size = 100;
  } else {
    size = 170;
  }
  const design = { color: '#808080', backgroundColor: color ? '#f8f6ff' : '#fff' };

  if (data) {
    return (
      <tr style={design}>
        <td>{data.title}</td>
        <td><a href={data.url} target="_blank" className={data.url.length > 6 ? '' : 'disabled'} rel="noreferrer">{data.url.length > 6 ? 'Go to Website' : 'Not available'}</a></td>
        <td>
          <p className="pointer" role="button" onClick={showData} tabIndex={0} onKeyDown={showData}>
            {data.selection.length > size ? `${data.selection.substr(0, size)}.....` : data.selection}
          </p>
          {' '}
          <i role="button" aria-label="delete" className="float-right text-danger fa fa-trash-o pointer ml-2" onClick={deleteBookmark} tabIndex={0} onKeyDown={deleteBookmark} />
        </td>
      </tr>
    );
  }
  return (<div />);
};

export default Bookmark;
