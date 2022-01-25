const Password = require("node-php-password");
const jwt = require('jsonwebtoken');

const user = require('../models/users');

//AUTH FROM HIVE-LINK
exports.userAuthIntergration=(req, res, next)=>{
    const screte_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVrYXZodXJAZW5nbG9uLmNvbSIsImlhdCI6MTU3MDc5NTAwNywiZXhwIjoxNTcwODAyMjA3fQ.UPQMBOOOEx9__4_xOeiT6QG5ULzIpBX0P-YVXMr8OPg';

    webtocken = "";
    try{
        var decodedToken = jwt.verify(req.query.token, screte_key); 
     
        const data = {
            fingerPrint : req.fingerprint.hash,
            companyId : decodedToken.companyId, 
            email : decodedToken.email, 
            staffId: decodedToken.userId, 
            userId : decodedToken.userId, 
            access_level : decodedToken.accessLevel
        }
           
    
        webtocken = jwt.sign(data, screte_key, {expiresIn : '7h'});
        res.redirect("https://incident-app.hivelink.com.au/?USERNAME="+data.email+"&STAFF_ID="+data.staffId+"&ACCESS_LEVEL="+data.access_level+"&TOCKEN="+webtocken);
        
    }catch(error){
        res.status(401).json({msg: 'Invalid auth key'});
        console.log(error)
    }
    
}

exports.developerAuth = (req, res, next) =>{
    
    const username = req.params.username;
    const password = req.query.pass;
    const screte_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVrYXZodXJAZW5nbG9uLmNvbSIsImlhdCI6MTU3MDc5NTAwNywiZXhwIjoxNTcwODAyMjA3fQ.UPQMBOOOEx9__4_xOeiT6QG5ULzIpBX0P-YVXMr8OPg';
    var webtocken;
   user.findOne({ where :{email : username, status : true}})
    .then( FoundUser => {
        if(!Password.verify(FoundUser.dataValues.password , password)){
            const data = {
                fingerPrint : req.fingerprint.hash,
                companyId : FoundUser.dataValues.company, 
                email : username, 
                staffId: FoundUser.dataValues.id, 
                userId : FoundUser.dataValues.id , 
                access_level : FoundUser.dataValues.access_level
            }
            if (FoundUser.dataValues.access_level==1) {
                 webtocken = jwt.sign(data, screte_key, {expiresIn : '7h'});    
            }else{
                webtocken = jwt.sign(data, screte_key, {expiresIn : '7h'});    
            }
            res.redirect("http://localhost:3000?USERNAME="+username+"&STAFF_ID="+FoundUser.id+"&ACCESS_LEVEL="+FoundUser.dataValues.access_level+"&TOCKEN="+webtocken);
         }else{
            res.status(401).json({res : 'Wrong password!!!'})
         }
    })
    .catch(err => {
        res.status(401).json({res : 'Wrong password!!!'})
        console.log(err);
    })
}