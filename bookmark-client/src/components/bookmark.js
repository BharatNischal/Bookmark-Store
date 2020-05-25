import React,{useContext} from 'react';
import axios from "axios";
import {BookmarkContext} from "../contexts/bookmark";


const Bookmark = (props)=>{

  const {bookmarks,setBookmarks} = useContext(BookmarkContext);

const del = ()=>{
  axios.delete(`/api/bookmark/${props.data._id}`)
    .then(res=>{
      if(res.data.success){
          setBookmarks(bookmarks.filter(bookmark=>{
            return bookmark._id != props.data._id;
          }))
      }
    })
}

    const data = props.data;
    const color = props.color;
    console.log(data);
      const design = {color:"#808080",backgroundColor:color?"#f8f6ff":"#fff"}
      if(data){
        return(<tr style={design}>
          <td scope="col">{data.title}</td>
          <td scope="col"><a href={data.url} target="_blank" className={data.url.length>6?"":"disabled btn"}>{data.url.length>6?"Go to Website":"Not available"}</a></td>
          <td scope="col" className="pointer" onClick={()=>{props.enableModal(data);window.$('#exampleModal').modal()}}>{data.selection.length>300?data.selection.substr(0,300)+".....":data.selection}<i className="float-right text-danger fa fa-trash-o pointer ml-2" onClick={del}></i></td>
        </tr>);
    }else{
      return(<div></div>)
    }
}

export default Bookmark;
