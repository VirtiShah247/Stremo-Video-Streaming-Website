const express= require('express')
const { loginControl, registerControl, tokenExpiredControl, continueWatching, continueWatchingMovies, continueVideo, deleteVideo } = require('./userController')
const { validateUserInput } = require('./validateUserInput');
const videoDownload = require('./videoDownload');
//router object
const router=express.Router()

//routes
router.post('/login',loginControl)
router.post('/register',validateUserInput,registerControl)
router.post('/browse', tokenExpiredControl)
router.post('/download',videoDownload)
router.post('/continueWatching', continueWatching)
router.post('/ContinueWatchingMovies', continueWatchingMovies)
router.post('/continueVideo', continueVideo)
router.post('/deleteVideo', deleteVideo);
module.exports= router