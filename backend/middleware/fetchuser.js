const jwt = require('jsonwebtoken');

const JWT_SECRET = 'leftisright';


//this middleware wil fetch us the unique id of the user entry in the database using the authtoken (login required i.e. existing authtoken will be required)
const fetchuser = (req, res, next)=>{
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send({error:"Please submit a valid authentication token"})
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        console.error(error.message);
        return res.status(401).send({error:"Please submit a valid authentication token"})
    }



}

module.exports = fetchuser;