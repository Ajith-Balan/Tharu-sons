import express from "express"
import { isAdmin, requireSignIn } from "../middlewares/authmiddleware.js"
import { createtypeController, deletetype, getonetype, gettypecontroller, productsiteController, searchtypeController, typeCategoryController, updatetype } from "../controllers/catController.js"

const router = express.Router()



router.post('/create-cat', requireSignIn, isAdmin, createtypeController)


router.get('/get-cat', gettypecontroller)


router.get('/getone-cat/:id', getonetype)

router.post('/update-cat/:id', updatetype)


router.delete('/delete-cat/:id', deletetype)

router.get('/product-category/:id', typeCategoryController)

router.get('/product-site/:id', productsiteController)



router.get('/search/:keyword', searchtypeController)




export default router
