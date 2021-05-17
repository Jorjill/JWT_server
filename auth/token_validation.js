const { verify } = require("jsonwebtoken");

module.exports = {
    // checkToken middleware
    checkTokenAdmin: (req, res, next) => {
        let token = req.get("authorization");
        if(token){
            token = token.slice(7);
            verify(token, "qwe1234",(err, decoded)=>{   // check if jwt is valid, proceed if valid
                if(err){
                    res.json({
                        success:0,
                        message: "Invalid token"
                    });
                }else{
                    if(decoded.result.role==='a'){ // extract role from jwt and proceed if role==='a'
                        next();
                    }else{
                        res.json({
                            success:0,
                            message:"Not authorized"
                        })
                    }
                }
            });
        }else{
            res.json({
                success:0,
                message:"Access denied"
            })
        }
    },

    checkTokenClient: (req, res, next) => {
        let token = req.get("authorization");
        if(token){
            token = token.slice(7);
            verify(token, "qwe1234",(err, decoded)=>{   // check if jwt is valid, proceed if valid
                if(err){
                    res.json({
                        success:0,
                        message: "Invalid token"
                    });
                }else{
                    if(decoded.result.role==='c'){ // extract role from jwt and proceed if role==='a'
                        next();
                    }else{
                        res.json({
                            success:0,
                            message:"Not authorized"
                        })
                    }
                }
            });
        }else{
            res.json({
                success:0,
                message:"Access denied"
            })
        }
    }
}