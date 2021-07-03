const express = require('express');
const router = express.Router();
const faker = require('faker');
const Post = require('../../models/Post');




router.get('/', async (req, res)=>{
    res.render('layouts/admin');
});

router.post('/generate-fake-posts', async (req, res)=>{
    try{
    for (let i = 0; i < req.body.amount; i++) {
        const post = await new Post();
        post.title = faker.name.title()
        post.status = 'public'
        post.allowComments = faker.datatype.boolean()
        post.body = faker.lorem.sentence()
        
        const savePost = await post.save()
        
    }
    }catch(err){
        console.log(err)
    }
    res.redirect('/admin/posts')
})
module.exports = router;