import { Router } from 'express'
import { checkAuth } from "../utils/chechAuth.js"
import { createComment, removeComment } from "../controllers/comment.js"

const router = new Router()

//Создание комментария
//http://localhost:8080/api/comments/:id
router.post('/:id', checkAuth, createComment)

//Удаление коммента
//http://localhost:8080/api/comments/:id
router.delete('/:id', checkAuth, removeComment)

export default router