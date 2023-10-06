import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    foodName : {
        type : String,
        require : true
    },
    calories : {
        type : Number,
        require : true,
    },
    protein : {
        type : Number,
        require : true
    },
    carbohydrates : {
        type : Number,
        require : true
    },
    fat : {
        type : Number,
        require : true
    }
}, {
    timestamps : true
})

export default mongoose.model("food" , foodSchema)