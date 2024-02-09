function validateUser(req, res, next){
    const user=req['currentUser'];
    
    if(!user){
        return res.state(401).send();
    }

    next();
}

module.exports=validateUser;