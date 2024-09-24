const express = require('express');
const router = express.Router();
const { post_contact } = require('../controller/cont');
const {c_valid } = require('../middleware/joivalidation');
const wrapasync = require('../utils/wrapasync');

router.get('/' , (req ,res)=>{
    res.render('index.ejs');
})

router.get('/home' , (req ,res)=>{
    res.render('index.ejs');
})


router.get('/about' , (req ,res)=>{
    res.render('about.ejs');
})

router.get('/services' , (req ,res)=>{
    res.render('services.ejs');
})

router.get('/projects' , (req ,res)=>{
    res.render('projects.ejs');
})

router.get('/blog' , (req ,res)=>{
    res.render('blog.ejs');
})



router.route('/contact')
    .get( (req , res)=>{
        res.render('contact.ejs');
    })
    .post(c_valid, wrapasync(post_contact))



module.exports = router;