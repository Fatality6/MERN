import React, { useCallback, useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { updatePost } from '../redux/features/post/postSlice'
import axios from '../utils/axios'

export const EditPostPage = () => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const params = useParams()
    const [oldImage, setOldImage] = useState('')
    const [newImage, setNewImage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fetchPost = useCallback(async () => {
        const { data } = await axios.get(`/posts/${params.id}`)
        setTitle(data.title)
        setText(data.text)
        setOldImage(data.imgUrl)
    }, [params.id])

    useEffect(() => {
        fetchPost()
    },[fetchPost])

    const handleSubmit = () => {
        try {
            const updatedPost = new FormData()
            updatedPost.append('title', title)
            updatedPost.append('text', text)
            updatedPost.append('id', params.id)
            updatedPost.append('image', newImage)
            dispatch(updatePost(updatedPost))
            toast('Пост был отредактирован')
            navigate('/works')
        } catch (error) {
            console.log(error)
        }
    }

    const clearFormHandler = () => {
        setTitle('')
        setText('')
    }

    return (
        <form
            className="w-1/3 mx-auto py-10"
            onSubmit={(e) => e.preventDefault()}>

            <label className="flex justify-center items-center text-gray-300 py-2 bg-gray-600 text-xs mt-2 border-2 border-dotted cursor-pointer">
                Добавить изображение:
                <input 
                    type="file" 
                    className="hidden" 
                    onChange={(e) => {
                        setNewImage(e.target.files[0])
                        setOldImage('')}} />
            </label>

            {/* отображение выбранной картинки перед отправкой*/}
            <div className="flex justify-center items-center object-cover py-2">
                {oldImage && <img src={`http://localhost:8080/${oldImage}`} alt={oldImage.name} />}
                {newImage && <img src={URL.createObjectURL(newImage)} alt={newImage.name} />}
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
                    Редактировать
                </button>
                <button
                    onClick={clearFormHandler}
                    className="flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4">
                    Отменить
                </button>
            </div>

        </form>)
}
