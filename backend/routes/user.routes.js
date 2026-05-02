const express = require('express');
const { registerUser, login, logout, getProfile, updateProfile  } = require('../controllers/user.controller'); 
const auth = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/register-user', registerUser);
router.post("/login",login);
router.post("/logout", auth, logout);
router.get("/profile", auth, getProfile);
router.patch("/profile", auth, updateProfile);

module.exports = router;
