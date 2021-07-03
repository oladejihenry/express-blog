const express = require('express');
const { findById } = require('../../models/Post');
const router = express.Router();
const Post = require('../../models/Post')
const {isEmpty} = require('../../helpers/upload-helper')

//Get all Posts
router.get('/', async (req, res)=>{
    try{
    const posts = await Post.find();

    res.render('admin/posts',{posts: posts});

    }catch(error){
        console.log(error)
    }
})

// Create Post (Go to Create Page)
router.get('/create', (req, res)=>{
    res.render('admin/posts/create')
})

//Create Post (Actually Save data into database)
router.post('/create', async (req, res)=>{

    if(!isEmpty(req.files)){
        // const file = await req.files.file
        // const filename = await file.name

        // file.mv('./public/uploads/' +filename, (err)=>{
        //     if(err) throw err
        // })

        console.log('is not empty')
    }


    // let allowComments = true;

    // if(req.body.allowComments){

    //     allowComments = true;

    // }  else{

    //     allowComments = false;
    // }
    // try{
    // const newPost = await new Post({
    //     title: req.body.title,
    //     status: req.body.status,
    //     allowComments: allowComments,
    //     body: req.body.body
    // });
    
    // const savedPost = await newPost.save();
    // console.log(savedPost);
    // res.redirect('/admin/posts');
    // }catch (error){
    //     console.log(error);
    // }
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



//Update Post
router.put('/edit/:id', async(req,res)=>{
    try{

        const post = await Post.findOne({_id: req.params.id });

        let allowComments = true;

        if(req.body.allowComments){

            allowComments = true;

        }  else{

            allowComments = false;
        }
        post.title = req.body.title
        post.status = req.body.status
        post.allowComments = allowComments
        post.body = req.body.body

        await post.save()

        res.redirect('/admin/posts')

        } catch(error){
            console.log(error)
    }

 
})

//Delete Posts
router.delete('/:id', async(req, res)=>{
    try {
        await Post.deleteOne({_id: req.params.id})
        res.redirect('/admin/posts')
    } catch (error) {
        console.log(error)
    }

})

module.exports = router;