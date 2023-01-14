import React, { useEffect } from "react"
import { Layout } from './components/Layout.jsx'
import { Routes, Route } from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { MyWorks } from "./pages/MyWorks.jsx"
import { AddPostPage } from "./pages/AddPostPage.jsx"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from "react-redux"
import { getMe } from "./redux/features/auth/authSlice.js"
import { PostPage } from "./pages/PostPage.jsx"
import { EditPostPage } from "./pages/EditPostPage.jsx"

function App() {
  //при каждом обновлении страницы через dispatch вызывается getMe
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="login" element={<LoginPage />}></Route>
        <Route path="registration" element={<RegisterPage />}></Route>
        <Route path=":id" element={<PostPage />}></Route>
        <Route path=":id/edit" element={<EditPostPage />}></Route>
        <Route path="works" element={<MyWorks />}></Route>
        <Route path="new" element={<AddPostPage />}></Route>
      </Routes>
      {/* настройки всплывающих окон */}
      <ToastContainer position="bottom-right" hideProgressBar />
    </Layout>
  )
}

export default App;
