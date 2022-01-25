
const jwt = require('jsonwebtoken');

const screte_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVrYXZodXJAZW5nbG9uLmNvbSIsImlhdCI6MTU3MDc5NTAwNywiZXhwIjoxNTcwODAyMjA3fQ.UPQMBOOOEx9__4_xOeiT6QG5ULzIpBX0P-YVXMr8OPg';

exports.checkAccessRightsAdmin = (req, res, next) =>{
        //receiving the token from the Authorisation header    
        var token = '';
        token = req.query.TOCKEN;
        let decodedToken;
        

        try {
            decodedToken = jwt.verify(token, screte_key); 
        } catch (err) {
        //console.log(err);
        }

        if(decodedToken){
            if (decodedToken.access_level==1) {
                next();
            }else{
                res.status(401).json({auth :'You are not authorised'});
            }
        }else{
            res.status(401).json({auth :'Token invalid, you are not authorised'});
        }
        
}

exports.checkAccessRightsUser = (req, res, next) =>{
    //receiving the token from the Authorisation header    
    var token = '';
    token = req.query.TOCKEN;
    let decodedToken;
    try {

        decodedToken = jwt.verify(token, screte_key); 
    } catch (err) {
        console.log(err);
    }

    if(decodedToken){
        next();
    }else{
        res.status(401).json({auth :'Token invalid, you are not authorised'});
    } 
}
