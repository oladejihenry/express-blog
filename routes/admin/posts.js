const express = require('express');
const { findById } = require('../../models/Post');
const router = express.Router();
const Post = require('../../models/Post')

//Get all Posts
router.get('/', async (req, res)=>{
    try{
    const posts = await Post.find();

    res.render('admin/posts',{posts: posts});

    }catch(error){
        console.log(error)
    }
})

// Create Post
router.get('/create', (req, res)=>{
    res.render('admin/posts/create')
})

router.post('/create', async (req, res)=>{

    let allowComments = true;

    if(req.body.allowComments){

        allowComments = true;

    }  else{

        allowComments = false;
    }
    try{
    const newPost = new Post({
        title: req.body.title,
        status: req.body.status,
        allowComments: allowComments,
        body: req.body.body
    });
    
    const savedPost = await newPost.save();
    console.log(savedPost);
    res.redirect('/admin/posts');
    }catch (error){
        console.log(error);
    }
    // newPost.save().then(savedPost =>{
    //     console.log(savedPost);
    //     res.redirect('/admin/posts');
    // }).catch(error=> {
    //     console.log('post cannnot save');
    // })
});

//Edit Post
router.get('/edit/:id', async (req,res)=>{
    try{

    const post = await Post.findOne({_id: req.params.id });

    res.render('admin/posts/edit', {post: post})
    } catch(error){
        console.log(error)
    }

})

module.exports = router;