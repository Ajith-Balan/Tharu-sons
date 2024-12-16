import express from "express";
import { isAdmin,requireSignIn } from "../middlewares/authmiddleware.js";
import {categoryController,CreateCategoryController,updateCategoryController,singlecategoryController,deleteCategoryController} from '../controllers/categoryController.js'

const router=express.Router()

router.post('/create-category',requireSignIn,isAdmin,CreateCategoryController,)

router.put(
    "/update-category/:id",
    requireSignIn,
    isAdmin,
    updateCategoryController
);
router.get("/get-category",categoryController)
router.get("/single-category/:id",singlecategoryController);




  router.delete(
    "/delete-category/:id",
    requireSignIn,
    isAdmin,
   deleteCategoryController
  );
export default router