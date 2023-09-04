const express = require('express')
const router = express.Router()
const controllers=require('../controllers/controllers')
const schema = require('../models/schema')
// const authController = require('../controllers/authController');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');


//login-logout
router.get('/signup', controllers.signup_get);
router.post('/signup', controllers.signup_post);
router.get('/login', controllers.login_get); 
router.post('/login', controllers.login_post);
router.get('/logout', controllers.logout_get);
 
// home page
router.get('/',requireAuth,controllers.home)

//newblog
router.get('/newblog',requireAuth,controllers.newblog)

//readmore
router.get('/readmore/:id',requireAuth,controllers.readmore)
// router.get('/delete/:id',controllers.gettask)

// My-Blogs
router.get('/myblogs/:id',requireAuth,controllers.myblogs)
// router.get('/update/:id',requireAuth,controllers.updatetask)

//CRUD 
router.get('/api/users/:id',controllers.gettask)
router.get('/api/users/',controllers.getalltasks)
router.post('/api/users/',controllers.posttask)
router.patch('/api/users/:id',controllers.updatetask)
// router.delete('api/users/:id',controllers.deletetask)
router.get('/delete/:id',controllers.deletetask)



//categories
router.get('/category/:category',controllers.category)

// export
module.exports = router