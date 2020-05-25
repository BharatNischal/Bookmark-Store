var express =  require("express"),
    router  =  express.Router(),
    User    =  require("./models/user")
    Bookmark    =  require("./models/bookmark.js");




router.get("/",(req,res)=> {
  if(!req.user){
    res.send([]);
  }else{
    User.findById(req.user._id).populate("bookmarks").exec((err,user)=>{
      if(err){
        res.json({success:false,msg:err.message});
      }else{
        const {bookmarks} = user;
        console.log("bookmarks",bookmarks);
        res.json(bookmarks);
      }
    });
  }
});

router.post("/",(req,res)=> {
  console.log("post request",req.user);
  console.log("axios data",req.body);
  if(!req.user){
    res.json({success:false,msg:"Not Logged in"});
  }else{
    Bookmark.create({...req.body})
    .then(newBookmark=>{
      User.findById(req.user._id)
        .then(user=>{
          user.bookmarks.push(newBookmark._id);
          console.log("saved user",user);
          user.save();
          res.json({...newBookmark,success:true});
        })
    })
    .catch(function (err) {
      res.json({success:false,msg:err.message});
    });
  }
});

router.get("/:bookmarkId", (req,res)=> {
  Bookmark.findById(req.params.bookmarkId)
  .then(function (foundBookmark) {
    res.json(foundBookmark);
  })
  .catch(function (err) {
    console.log(err);
    res.json({success:false,msg:err.message});
  });
});

router.put("/:bookmarkId", (req,res)=> {
  Bookmark.findByIdAndUpdate({_id:req.params.bookmarkId},req.body)
  .then(function (updatedBookmark) {
    res.json(updatedBookmark);
  })
  .catch(function (err) {
    console.log(err);
    res.json({success:false,msg:err.message});
    });
});

router.delete("/:bookmarkId", (req,res)=> {
  Bookmark.remove({_id:req.params.bookmarkId})
  .then(()=> {
    User.find({username:req.user.username})
      .then(user=>{
        var ind = user.bookmarks.indexOf(req.params.bookmarkId);
        if(ind != -1){
          user.bookmarks.splice(ind,1);
          user.save();
        }
        res.json({success:true});
      })
  })
  .catch(function (err) {
    console.log(err);
    res.json({success:false});
  });
});

router.post('/search',(req,res)=>{
  console.log("recieved Search",req.body.title);
  const regex = new RegExp(escapeRegex(req.body.title), 'gi');
  User.findById(req.user._id).populate("bookmarks").exec((err,user)=>{
    if(err){
      res.json({success:false,msg:err.message});
    }else{
      const {bookmarks} = user;
      const regex = new RegExp(escapeRegex(req.body.title), 'gi');
      filteredBookmarks = bookmarks.filter(({title,url,selection}) => title.match(regex)||url.match(regex)||selection.match(regex));
      console.log("bookmarks",filteredBookmarks);
      res.json(filteredBookmarks);
    }
  });
});


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;
