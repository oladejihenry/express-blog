const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const PostSchema = new Schema({

    title:{
        type: String,
        required: true
    },

    status:{
        type: String,
        default: 'publi'
    },

    allowComments:{
        type: Boolean,
        required: true
    },

    body:{
        type: String,
        required: true
    },

    file:{
        type: String,
    }

});

module.exports = mongoose.model('posts', PostSchema);