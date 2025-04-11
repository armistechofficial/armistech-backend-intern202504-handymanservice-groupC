import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Service tile is required. "]
    },
    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    price: {
        type: Number,
        required: [true, "Service cost is required." ]
    },
    image: {
        type: String
    },
    description: {
        type: String,
        required: [true, "Service description is required. "]
    }
})

const Service = mongoose.model("service", serviceSchema);

export default Service;
