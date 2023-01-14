import React from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { createPost } from "../redux/features/post/postSlice"

export const AddPostPage = () => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [image, setImage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {status} = useSelector((state => state.post))

    //подготовка и отправка в redux объекта
    const handleSubmit = () => {
        try {
            const data = new FormData()
            data.append('title', title)
            data.append('image', image)
            data.append('text', text)
            dispatch(createPost(data))
            toast(status)
            navigate('/')
            clearFormHandler()
        } catch (error) {
            console.log(error)
        }
    }
    //очистка формы
    const clearFormHandler = () => {
        setTitle('')
        setText('')
        setImage('')
    }

    return (
        <form
            className="w-1/3 mx-auto py-10"
            onSubmit={(e) => e.preventDefault()}>

            <label className="flex justify-center items-center text-gray-300 py-2 bg-gray-600 text-xs mt-2 border-2 border-dotted cursor-pointer">
                Добавить изображение:
                <input type="file" className="hidden" onChange={(e) => setImage(e.target.files[0])} />
            </label>

            {/* отображение выбранной картинки перед отправкой*/}
            <div className="flex justify-center items-center object-cover py-2">
                {image && <img src={URL.createObjectURL(image)} alt={image.name} />}
            </div>

            <label className="text-xs text-white opacity-70">
                Заголовок поста:
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Заголовок поста"
                    className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700" />
            </label>

            <label className="text-xs text-white opacity-70">
                Текст поста:
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Текст"
                    className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700" />
            </label>

            <div className="flex gap-8 justify-center items-center mt-4">
                <button
                    onClick={handleSubmit}
                    className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">
                    Добавить
                </button>
                <button
                    onClick={clearFormHandler}
                    className="flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4">
                    Отменить
                </button>
            </div>

        </form>)
}