import categoryScheama from '../models/category.model.js'
export const CreateCategoryController = async (req,res)=>{
    try {
       const {name} = req.body 
       if(!name){
        return res.status(401).send({message:'name is required'})
    }
    const exisitingCategory = await categoryScheama.findOne({name})
    if(exisitingCategory){
        return res.status(200).send({
            success:true,
            message:'category already exists'
        })
    }
    const category = await categoryScheama({name}).save()
    res.status(201).send({
        success:true,
        message:'New category Created',
        category
    })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'error in category'
        })
        
    }
}

export const updateCategoryController = async (req,res) =>{
    try {
        const {name}=req.body;
        const {id} =req.params;
        const category = await categoryScheama.findByIdAndUpdate(id,{name},
            {new:true}
        );
        res.status(200).send({
            success:true,
            message:'Category Updated Successfully',
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error While Updating Category'
        })
        
    }
}

export const singlecategoryController = async (req,res) =>{
    try {
        const {_id} =req.params;
        const category = await categoryScheama.findOne({_id});
        res.status(200).send({
            success:true,
            message:'Get Single Category Sucessfully'
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error in getting Single category'
        })
            }
};

export const categoryController = async (req, res) => {
    try {
      const category = await categoryScheama.find();
      res.status(200).send({
        success: true,
        message: "All Categories List",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while getting all categories",
      });
    }
  };


export const deleteCategoryController = async(req,res)=>{
    try {
       const {id} =req.params;
       await categoryScheama.findByIdAndDelete(id);
       res.status(200).send({
        success:true,
        message:'Successfully Deleted Category'
       })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'error in deleting category',
        });
        
        
    }
}