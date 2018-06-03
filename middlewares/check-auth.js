var jwt= require('jsonwebtoken');

module.exports = function (req,res,next) {
    try {
        var token= req.headers.authorization.split(" ")[1];
        var decoded = jwt.verify(token, 'secret');
        req.userData= decoded;
        next();
    }catch(error){
        return res.status(401).json({
            success:false,
            message: 'user'
        });
    }
};