import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../../utils/axios.js'

const initialState = {
    posts: [],
    popularPosts: [],
    myPosts:[],
    status: null,
    isLoading: false
}

export const createPost = createAsyncThunk('post/createPost', async(params) => {
    try {
        const { data } = await axios.post('/posts', params)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const getAllPosts = createAsyncThunk('post/getAllPosts', async() => {
    try {
        const { data } = await axios.get('/posts')
        return data
    } catch (error) {
        console.log(error)
    }
})

export const getMyPosts = createAsyncThunk('post/getMyPosts', async() => {
    try {
        const { data } = await axios.get('posts/user/me')
        return data
    } catch (error) {
        console.log(error)
    }
})

export const removePost = createAsyncThunk('post/removePost', async(id) => {
    try {
        const { data } = await axios.delete(`posts/${id}`)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const updatePost = createAsyncThunk('post/updatePost', async(updatedPost) => {
    try {
        const { data } = await axios.put(`posts/${updatedPost.id}`, updatedPost)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
       
    },
    extraReducers: {
        //Создание поста
        [createPost.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [createPost.fulfilled]: (state, action) => {
            state.isLoading = false
            state.posts.push(action.payload.newPostWithImage)
            state.status = action.payload.message
        },
        [createPost.rejected]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
        },
        //Получение всех постов
        [getAllPosts.pending]: (state) => {
            state.isLoading = true
        },
        [getAllPosts.fulfilled]: (state, action) => {
            state.isLoading = false
            state.posts = action.payload.posts
            state.popularPosts = action.payload.popularPosts
        },
        [getAllPosts.rejected]: (state) => {
            state.isLoading = false
        },
        //Получение моих постов
        [getMyPosts.pending]: (state) => {
            state.isLoading = true
        },
        [getMyPosts.fulfilled]: (state, action) => {
            state.isLoading = false
            state.myPosts = action.payload
        },
        [getMyPosts.rejected]: (state) => {
            state.isLoading = false
        },
        //Редактирование поста
        [updatePost.pending]: (state) => {
            state.isLoading = true
        },
        [updatePost.fulfilled]: (state, action) => {
            state.isLoading = false
            //ищем индекс изменённого поста в массиве
            const index = state.posts.findIndex((post) => post._id === action.payload._id)
            //изменяем пост с полученным индексом на обнавлённый пост
            state.posts[index] = action.payload
        },
        [updatePost.rejected]: (state) => {
            state.isLoading = false
        },
        //Удаление поста
        [removePost.pending]: (state) => {
            state.isLoading = true
        },
        [removePost.fulfilled]: (state, action) => {
            state.isLoading = false
            //перезаписываем state без поста с полученным id
            state.posts = state.posts.filter((post) => post._id !== action.payload.id)
        },
        [removePost.rejected]: (state) => {
            state.isLoading = false
        }
    }
})

export default postSlice.reducer
