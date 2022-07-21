import express from 'express';
import UserController from '../controllers/userController.js';
const router=express.Router();

router.get('/',UserController.Home);
router.get('/signup',UserController.SignUp);
router.post('/signup',UserController.createUserDoc);
router.get('/login',UserController.Login)
router.post('/login',UserController.verifyLogin)


export default router;