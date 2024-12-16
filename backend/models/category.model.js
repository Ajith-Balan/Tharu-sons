import mongoose,{Mongoose,model}from 'mongoose'


const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    }
})

export default mongoose.model.category ||mongoose.model('category',categorySchema)