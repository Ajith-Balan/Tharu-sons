import productModel from "../models/product.model.js";
import categoryModel from '../models/category.model.js'
import catModel from "../models/cat.model.js";

export async function createtypeController(req, res) {
  try {
    const { name, category,site } = req.body;

    // Validation (add additional checks if necessary)
    if (!name || !category || !site) {
      return res.status(400).send({ error: "All fields are required" });
    }
      //  const exisitingtype = await catModel.findOne({name})
      //   if(exisitingtype){
      //       return res.status(200).send({
      //           success:true,
      //           message:'Type already exists'
      //       })
      //   }

    // Create the product
    const product = await catModel.create({
      name,
  site,
      category,
    });

    // Send success response with the created product
    res.status(201).send({
      success: true,
      message: "category Created Successfully",
      product, // send the created product back
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating category",
    });
  }
}




export async function gettypecontroller(req,res){
  try{

      const data=await catModel.find();
      res.status(200).send(data)
  }catch (error){
      res.status(500).send(error)
  }
}





export async function getonetype(req,res) {
  try {
      const {id}=req.params;
      const data = await catModel.findOne({_id:id})
      res.status(200).send(data)
  } catch (error) {
      res.status(400).send(error)
  }
}





export async function updatetype(req,res){
  try{
      const {id}=req.params;
      const{...data}=req.body
      await catModel.updateOne({_id:id},{$set:{...data}})
      res.status(201).send({msg:"updated"})
      
  }catch (error){
      res.status(400).send(error)
}
}



export async function deletetype(req,res){
  try{
      const {id}=req.params;
      await catModel.deleteOne({_id:id});
      res.status(200).send({msg:"sucessfully deleted"})
  }catch (error){
      console.error(error);
      res.status(400).send({error})
  }
}

export const typeCategoryController = async (req, res) => {
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
    const products = await catModel.find({ category: category._id });

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




export const productsiteController = async (req, res) => {
    try {
      const { id } = req.params; 
      const site = await productModel.findOne({ _id: id }); // Fetch category by id
      if (!site) {
        return res.status(404).send({
          success: false,
          message: 'site not found',
        });
      }
  
  
      
  
      // Fetch products by category _id (use category._id)
      const cat = await catModel.find({ site: site._id });
  
      res.status(200).send({
        success: true,
        cat,
        site,
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
  
  
  




export const searchtypeController = async(req,res)=>{
  try {
    const {keyword}= req.params
    const results= await catModel.find({
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