import mongoose from "mongoose";
const tourSchema = new mongoose.Schema({
    title: { type: String, required: true },
    discription: { type: String, required: true },
    name: String,
    creator: String,
    tags: [String],
    imageFile: String,
    createdAt: {
        type: String,
        default: new Date()
    },
    likeCount: {
        type: Number,
        default: 0
    }
});

const tourModel = mongoose.model('tour', tourSchema);

export default tourModel;