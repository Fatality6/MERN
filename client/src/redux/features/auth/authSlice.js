import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../../utils/axios.js'

//создаём стартовый state
const initialState = {
    user: null,
    token: null,
    isLoading: false,
    status: null,
}

//создаём Thunk для выполнения запроса на сервер для регистрации
//метод createAsyncThunk создаёт Thunk 
export const registerUser = createAsyncThunk(
    //адрес должен быть уникальным для каждого Thunk
    'auth/registerUser',
    //второй параметр это асинх функция, которая получает объект с данными пользователя при помощи useDispatch 
    //и деалет запрос на сервер
    async({ username, password }) => {
        try {
            const { data } = await axios.post('auth/register',{
                username,
                password
            })

            //если в ответе есть токен, то записываем его в localStorage
            if(data.token) {
                window.localStorage.setItem('token', data.token)
            }
            //возвращаем data
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

//создаём Thunk для выполнения запроса на сервер для авторизации
//метод createAsyncThunk создаёт Thunk 
export const loginUser = createAsyncThunk(
    //адрес должен быть уникальным для каждого Thunk
    'auth/loginUser',
    //второй параметр это асинх функция, которая получает объект с данными пользователя при помощи useDispatch 
    //и деалет запрос на сервер
    async({ username, password }) => {
        try {
            const { data } = await axios.post('auth/login',{
                username,
                password
            })

            //если в ответе есть токен, то записываем его в localStorage
            if(data.token) {
                window.localStorage.setItem('token', data.token)
            }
            //возвращаем data
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

//создаём Thunk для выполнения запроса на сервер для получения профиля
//метод createAsyncThunk создаёт Thunk 
export const getMe = createAsyncThunk(
    //адрес должен быть уникальным для каждого Thunk
    'auth/getMe',
    //второй параметр это асинх функция
    //и деалем запрос на сервер
    async() => {
        try {
            const { data } = await axios.get('auth/me')
            //возвращаем data
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null
            state.isLoading = false
            state.status = null
        }
    },
    extraReducers: {
        //register user
        [registerUser.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [registerUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
        },
        [registerUser.rejected]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
        //login user
        [loginUser.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [loginUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
        },
        [loginUser.rejected]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
        //get me
        [getMe.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [getMe.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = null
            state.user = action.payload?.user
            state.token = action.payload?.token
        },
        [getMe.rejected]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
    }
})

export const checkIsAuth = (state) => Boolean(state.auth.token)

export const { logout } = authSlice.actions

export default authSlice.reducer