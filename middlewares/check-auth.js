const jwt= require('jsonwebtoken');

exports.checkStudentAuth = function (req,res,next) {
    try {
        const token= req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'secret');
        if(decoded.user_role=='student'){
            req.userData= decoded;
            next();
        }
        else {
            return res.status(401).json({
                success:false,
                message: 'unzuthorized user'
            });
        }
    }catch(error){
        return res.status(401).json({
            success:false,
            message: 'unzuthorized user'
        });
    }
};
exports.checkProfessorAuth = function (req,res,next) {
    try {
        const token= req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'secret');
        if(decoded.user_role=='professor'){
            req.userData= decoded;
            next();
        }
        else {
            return res.status(401).json({
                success:false,
                message: 'unzuthorized user'
            });
        }
    }catch(error){
        return res.status(401).json({
            success:false,
            message: 'unzuthorized user'
        });
    }
};