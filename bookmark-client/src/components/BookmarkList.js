import React,{useContext,useState} from 'react';
import Bookmark from './bookmark';
import {BookmarkContext} from "../contexts/bookmark";


const BookmarkList = (props)=>{
    const {bookmarks} = useContext(BookmarkContext);

    if(bookmarks && bookmarks.length>0){
      return (
        bookmarks.map((bookmark,i)=>
          <Bookmark key={bookmark._id} data={bookmark} color={i%2==1?true:false} enableModal={props.enableModal}/>
        )
      );
    }else{
      return (
        <tr>
          <td>Empty</td><td>Empty</td><td>Empty</td>
        </tr>
      )
    }
}

export default BookmarkList;
