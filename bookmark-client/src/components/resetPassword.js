import React,{useState} from "react";
import axios from "axios";

const ResetPassword = (props)=>{

  const [err,setErr] = useState("");
  const [password,setPassword] = useState("");
  const [btnclick,setBtnclick] = useState(false);

  let button;
    if(!btnclick){
      button = <button className="btn btn-lg text-white rounded" style={{backgroundColor:"#6c7ae0"}} onClick={()=>{setBtnclick(true)}}>Change Password </button>
    }else{
      button =  <button type="submit" className="btn btn-lg text-white rounded" style={{backgroundColor:"#6c7ae0"}}><img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif" className="loader"/></button>;
    }

  const submitForm = (e)=>{
    setErr("");
    e.preventDefault();
    if(password==""){
      setErr("Password can't be empty")
      setBtnclick(false);
      return;
    }
    axios.post("http://localhost:8080/api/reset/"+props.match.params.token,{password})
      .then(res=>{
          if(res.data.success){
            props.history.push("/");
          }else{
            setErr(res.data.msg);
            setBtnclick(false);
          }
      })
      .catch(err=>{
        setErr(err.message);
        setBtnclick(false);
      })
      setPassword("");
  }

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-sm-2 col-lg-4"></div>
        <div className="col-sm-8 col-lg-4 shadow rounded">
          <br/>
          <h1 className="text-center mb-4" style={{color:"#6c7ae0"}}>New Password</h1>
          <form onSubmit={submitForm}>
            <div className="form-group">
              <input type="password" className="form-control form-control-lg" name="username" id="username" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password"/>
            </div>
              <div className="form-group justify-content-center" ma>
              {button}
            </div>
          </form>
          <h6 className="text-danger text-center">{err}</h6>
          <br/>
        </div>
        <div className="col-sm-2 col-lg-4"></div>
      </div>
    </div>
  );

}

export default ResetPassword;
