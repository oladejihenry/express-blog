const express = require('express');
const { findById } = require('../../models/Post');
const router = express.Router();
const Post = require('../../models/Post')
const {isEmpty, uploadDir} = require('../../helpers/upload-helper')
const fs = require('fs')
const path = require('path')

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
router.post('/create',  async (req, res)=>{
    try{
        const errors =  [];

        if(!req.body.title){
            errors.push({message: 'Please add a title'});
        }
        
        if(errors.length > 0){
            res.render('admin/posts/create',{errors: false})
         }} catch(errors){
            res.render('admin/posts/create',{errors: false})
            } 
           
        
    try{
        

    let filename = 'Nissan.jpeg';

    if(!isEmpty(req.files)){
        const file =  req.files.file
         filename =  Date.now() + '-' + file.name

        file.mv('./public/uploads/' + filename, (err)=>{
            if(err) throw err
        })

    }


    let allowComments = true;

    if(req.body.allowComments){

        allowComments = true;

    }  else{

        allowComments = false;
    }
    
    const newPost = await new Post({
        title: req.body.title,
        status: req.body.status,
        allowComments: allowComments,
        body: req.body.body,
        file: filename
    });
    
    const savedPost =  await newPost.save();
    // console.log(savedPost);
    res.redirect('/admin/posts');
    
    } catch (error){
        console.log(error);
    }
    // newPost.save().then(savedPost =>{
    //     console.log(savedPost);
    //     res.redirect('/admin/posts');
    // }).catch(error=> {
    //     console.log(error, 'post cannnot save');
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
router.delete('/:id', async (req, res)=>{
   
       await Post.findOne({_id: req.params.id}).then(post=>{
           fs.unlink(uploadDir + post.file, (err)=>{
               post.remove();
               res.redirect('/admin/posts')
           })
       })
        // fs.unlink(uploadDir + post.file, (err)=>{
            
        //     post.remove()
        //     res.redirect('/admin/posts')
        // })
        
    

})

module.exports = router;