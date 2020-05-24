const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
     // process.env.cliendId, // ClientID
     // process.env.secret, // Client Secret
     // "https://developers.google.com/oauthplayground" // Redirect URL
     "896676770009-qvj8p86fupkujiuauh20iav17p93lum2.apps.googleusercontent.com", // ClientID
     "Mu60DbPsj_CkKMt8Ws74XAPK", // Client Secret
     "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
     // refresh_token: process.env.refreshToken
     refresh_token: "1//04XFiXoYyRXPRCgYIARAAGAQSNwF-L9IrAdpH-kteNKAF_YzGzPdte9e1OfJdLqRL077HNmfpydn0e9YC04uvLxXBqZrn7DJSERc"
});


const accessToken = oauth2Client.getAccessToken();

const smtpTransport = nodemailer.createTransport({
     service: "gmail",
     auth: {
          // type: "OAuth2",
          // user: "nischalbharat4819@gmail.com",
          // clientId: process.env.client,
          // clientSecret: process.env.secret,
          // refreshToken: process.env.refreshToken,
          // accessToken: accessToken
          type: "OAuth2",
          user: "nischalbharat4819@gmail.com",
          clientId: "896676770009-qvj8p86fupkujiuauh20iav17p93lum2.apps.googleusercontent.com",
          clientSecret: "Mu60DbPsj_CkKMt8Ws74XAPK",
          refreshToken: "1//04XFiXoYyRXPRCgYIARAAGAQSNwF-L9IrAdpH-kteNKAF_YzGzPdte9e1OfJdLqRL077HNmfpydn0e9YC04uvLxXBqZrn7DJSERc",
          accessToken: accessToken
     }
});

module.exports=function(mailOptions,callback){
    smtpTransport.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }
        if(info){
            console.log('Message sent: ' + info.response);
            callback(error,info.respone);
        }else{
            callback(error,null);
        }
    });
}
