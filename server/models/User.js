import mongoose, { Schema } from "mongoose";

//Схема для создания нового пользователя
const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
    },
    //для создания временных меток в будущих постах добавляем timestamps
    { timestamps: true }
)

export default mongoose.model('User', UserSchema)