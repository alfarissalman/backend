const express = require('express')
const cors = require('cors')
const db = require('./config/db')
const { v4: uuidv4 } = require('uuid');
const authController = require('./controllers/auth.controller')
const verifyToken = require('./helper/verifyToken');
const informationController = require('./controllers/information.controller');
const upload = require('./helper/multer');
const transactionController = require('./controllers/transaction.controller');

const app = express()

app.use(cors())
app.use(express.json())
app.use('/', express.static('uploads'))

//auth
app.post("/api/registration", authController.register)
app.post("/api/login", authController.login)
app.get("/api/profile", verifyToken.user, authController.getByProfile)
app.put("/api/profile/update",verifyToken.user,authController.update)
app.put("/api/profile/image",verifyToken.user,upload.single('profile_image'),authController.updateByImage)

//information
app.get("/api/banner",informationController.getAllBanner)
app.get("/api/services",verifyToken.user,informationController.getAllService)

//transaction
app.get("/api/balance",verifyToken.user,transactionController.getByBalance)
app.post("/api/topup",verifyToken.user,transactionController.topup)
app.post("/api/transaction",verifyToken.user,transactionController.createTransaction)
app.get("/api/transaction/history",verifyToken.user,transactionController.getTransaction)


app.listen(5000, () => {
    console.log('Be already Runtime')
})