const User = require("../../../models/user");
const jwt = require('jsonwebtoken');

//sigin using api ---jwt 
module.exports.createSession = async function (req, res) {
    try {
        let user = await User.findOne({ email: req.body.email })
        
        if (!user || user.password != req.body.password) {
            return res.json(422, {
                message:"Invalid username and Password"
            })
        } else {
            return res.json(200, {
                message: "Successful Login",
                //token creation
                data: {
                    token:jwt.sign(user.toJSON(),'codeial',{expiresIn : '10000'})
                }
            },)
        }
    }
    catch (error) {
        console.log("********", error);
        return res.json(500, {
            message: "Internal Server Error",
        });
    }
} 