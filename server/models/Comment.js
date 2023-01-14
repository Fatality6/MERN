import mongoose, { Schema } from "mongoose";

//схема для создания нового поста
const CommentSchema = new mongoose.Schema(
    {
        comment: { type: String, required: true },
        //ищем автора в таблице User по ID
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
)

export default mongoose.model('Comment', CommentSchema)