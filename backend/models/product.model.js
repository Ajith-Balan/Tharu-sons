import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },
  
  
  },
  { timestamps: true }
);



export default mongoose.model("products", productSchema);

