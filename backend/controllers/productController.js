import productModel from "../models/product.model.js";
import categoryModel from '../models/category.model.js'
export async function createProductController(req, res) {
  try {
    const { name, category } = req.body;

    // Validation (add additional checks if necessary)
    if (!name || !category) {
      return res.status(400).send({ error: "All fields are required" });
    }

    // Create the product
    const product = await productModel.create({
      name,
  
      category,
    });

    // Send success response with the created product
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      product, // send the created product back
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating product",
    });
  }
}




export async function getproductcontroller(req,res){
  try{

      const data=await productModel.find();
      res.status(200).send(data)
  }catch (error){
      res.status(500).send(error)
  }
}





export async function getoneproduct(req,res) {
  try {
      const {id}=req.params;
      const data = await productModel.findOne({_id:id})
      res.status(200).send(data)
  } catch (error) {
      res.status(400).send(error)
  }
}





export async function updateproduct(req,res){
  try{
      const {id}=req.params;
      const{...data}=req.body
      await productModel.updateOne({_id:id},{$set:{...data}})
      res.status(201).send({msg:"updated"})
      
  }catch (error){
      res.status(400).send(error)
}
}



export async function deleteproduct(req,res){
  try{
      const {id}=req.params;
      await productModel.deleteOne({_id:id});
      res.status(200).send({msg:"sucessfully deleted"})
  }catch (error){
      console.error(error);
      res.status(400).send({error})
  }
}

export const productCategoryController = async (req, res) => {
  try {
    const { id } = req.params; 
    const category = await categoryModel.findOne({ _id: id }); // Fetch category by id
    if (!category) {
      return res.status(404).send({
        success: false,
        message: 'Category not found',
      });
    }

    // Fetch products by category _id (use category._id)
    const products = await productModel.find({ category: category._id });

    res.status(200).send({
      success: true,
      category,
      products,
    });
    
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: 'Error while getting products',
    });
  }
};






export const searchProductController = async(req,res)=>{
  try {
    const {keyword}= req.params
    const results= await productModel.find({
      
      $or:[
        {name:{$regex : keyword,$options :"i"}},
        {description:{$regex : keyword,$options:"i"}}
      ]
    })
    res.send(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message:"error in search product"
    })
    
  }
}