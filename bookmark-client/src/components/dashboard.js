import React,{useContext,useEffect,useState} from 'react';
import BookmarkList from './BookmarkList';
import axios from "axios";
import {UserContext} from "../contexts/curUser";
import {BookmarkContext} from "../contexts/bookmark";

const Dashboard = (props)=>{

  const {setUser} = useContext(UserContext);
  const {bookmarks,setBookmarks} = useContext(BookmarkContext);
  const [form,setForm] = useState(false);
  const [formData,setFormData] = useState({title:"",url:"",selection:""});

  useEffect(()=>{

      const fetchUser = async () => {
         const response = await axios.get(`/api/user`);
         if(response.data && response.data.user){
           setUser({login:true,username:response.data.user.username,name:response.data.user.name});
         }else{
           props.history.push('/login');
         }
    }
    const fetchBookmarks = async() => {
      const response = await axios.get(`/api/bookmark/`);
      console.log("response is",response);
      if(response.data){
        console.log("response data called");
        setBookmarks(response.data);
      }
    }
    fetchUser();
    fetchBookmarks();
  },[]);

  const handleForm = (e)=>{
    e.preventDefault();
    axios.post('/api/bookmark',{...formData})
      .then(res=>{
          setBookmarks([...bookmarks,formData]);
          setForm(false);
          setFormData({title:"",url:"",selection:""});
      })
      .catch(err=>{
        setForm(false);
        setFormData({title:"",url:"",selection:""});
      })
  }

  const [modal,setModal] = useState({url:"",selection:"",title:""});

  let formdata = form?<form class="form mb-4" onSubmit={handleForm}>
                        <div class="row">
                          <div class="form-group col-6 col-md-3">
                            <input type="text" class="form-control" value={formData.title} onChange={(e)=>{setFormData({...formData,title:e.target.value})}} id="title" placeholder="Title"/>
                          </div>
                          <div class="form-group col-6 col-md-3">
                            <input type="url" class="form-control" value={formData.url} onChange={(e)=>{setFormData({...formData,url:e.target.value})}} id="url" placeholder="url"/>
                          </div>
                          <div class="form-group col-6 col-md-3">
                            <input type="text" class="form-control" value={formData.selection} onChange={(e)=>{setFormData({...formData,selection:e.target.value})}} id="selectedText" placeholder="Text"/>
                          </div>
                          <div class="form-group col-6 col-3">
                              <button type="submit" class="btn btn-primary text-white">Insert</button>
                          </div>
                        </div>
                      </form>:null;

  return (
    <div className="container">
      <div className="text-center">
        <h1 style={{color:"#6c7ae0"}}>BookMark Store</h1>
      </div>
      <br/>
      {(bookmarks && bookmarks.length>0)?<React.Fragment>
        <div>
        <table className="table table-responsive table-bordered shadow" id="style-4" style={{borderRadius:"15px",maxHeight:"80vh"}}>
          <thead className='text-white text-center w-100'>
            <tr>
              <th scope="col" style={{position:"sticky",top:"0",backgroundColor:"#6c7ae0"}}>Title</th>
              <th scope="col" style={{position:"sticky",top:"0",backgroundColor:"#6c7ae0"}}>Website Url</th>
              <th scope="col" style={{position:"sticky",top:"0",backgroundColor:"#6c7ae0"}}>Selected Text</th>
            </tr>
          </thead>
          <tbody>
            <BookmarkList enableModal={setModal} />
          </tbody>
        </table>
      </div>
      <div className={form?"d-none row justify-content-center":"row justify-content-center"} style={{position:"relative",top:"-30px",zIndex:"2"}}>
        <button className="btn btn-lg text-white rounded-pill" onClick={()=>{setForm(true)}} style={{backgroundColor:"#6c7ae0"}}>New Bookmark </button>
      </div>
      {formdata}
      <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
          <div className="modal-content" style={{borderRadius:"15px"}}>
            <div className="modal-header" style={{backgroundColor:"#6c7ae0"}}>
              <h5 className="modal-title text-white" id="exampleModalLabel">{modal.title}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div classname="modal-body" style={{padding:"10px",position: "relative",height: "300px",overflowY: "scroll"}}>
              {modal.selection}
            </div>
            <div className="modal-footer">
              <a href={modal.url} target="_blank">Visit Site</a>
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

  </React.Fragment>:<div>
                      <img src="https://itinerantnotes.com/blog/images/empty.gif" className="img-fluid mx-auto d-block"/>
                      <h5 className="text-center text-primary">1. Select text and right click 2. Press add to Bookmark store 3. Save your bookmarks </h5>
                    </div>}
      </div>
  );
}

export default Dashboard;
