import mongoose, { Schema } from "mongoose";

//схема для создания нового поста
const Postschema = new mongoose.Schema(
    {
        username: { type: String },
        title: { type: String, required: true },
        text: { type: String, required: true },
        imgUrl: { type: String, default: '' },
        views: { type: Number, default: 0 },
        //ищем автора в таблице User по ID
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        //тут массив
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
    },
    { timestamps: true }
)

export default mongoose.model('Post', Postschema)