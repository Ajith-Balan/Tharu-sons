import mongoose from "mongoose";

const catSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },
    site:{
        type:String,
        required:true
    }
  
  
  },
  { timestamps: true }
);



export default mongoose.model("cats", catSchema);

