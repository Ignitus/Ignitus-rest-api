const jwt= require('jsonwebtoken');

module.exports = function (req,res,next) {
    try {
        const token= req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'secret');
        req.userData= decoded;
        next();
    }catch(error){
        return res.status(401).json({
            success:false,
            message: 'user'
        });
    }
};