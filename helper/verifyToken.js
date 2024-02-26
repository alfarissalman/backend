const jwt = require("jsonwebtoken")
const verifyToken = {

    user: (req, res, next) => { // console.log(req.headers)
      
      try {
        if (req.headers.authorization) {
            const bearerToken = req.headers.authorization.split(" ")[1]
            const verify = jwt.verify(bearerToken, 'g3d2983hd238idiudgd87g8d3278d23')
            console.log(verify)
            if (verify) {
                req.userEmail = verify.email
                next()
            }       
        }else {
            return res.status(401).send({
                status:108,
                message: 'Unauthorized'
                
            })
        }
      } catch (error) {
        return res.status(401).send({
            status:108,
            message: 'Token tidak valid atau kadaluwarsa',
            data: null
        })
      }
         
    },


}

module.exports = verifyToken