import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Service tile is required. "]
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

export const providerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Service Provider name is required. "]
    },
    role: {
        type: String,
        required: [true, "Provider Role is required. "]
    },
    location: {
        type: String,
        required: [true, "Provider's location is required. "]
    },
    rating: {
        type: Number
    },
    reviews: {
        type :Number
    },
    totalServices: {
        type: Number
    },
    profileImage: {
        type: String
    },
    service: [serviceSchema]
}) 