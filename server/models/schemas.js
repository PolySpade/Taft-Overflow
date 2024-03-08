const mongoose = require('mongoose')
const Schema = mongoose.Schema

//user profile schema
const userSchema = new Schema({
    id: {type: Number},
    name: {type:String},
    email: {type:String, lowercase:true},
    school_id: {type:Number},
    degree: {type:String, uppercase:true},
    aboutme: {type:String},
    entryDate: {type:Date, default:Date.now}
})

const topicSchema = new Schema({
    name: {type:String, unique: true}
})

const courseSchema = new Schema({
    name: {type:String},
    entryDate: {type:Date, default:Date.now}
})

//post schema
const postSchema = new Schema({
    id: {type:Number},
    type: {type:String},
    user_id: {type:Number},
    title: {type:String},
    content: {type:String},
    entryDate: {type:Date, default:Date.now},
    topic_name: {type: [String],default:['general']},
    course_name: {type: String, default:'general'}
})

const commentSchema = new Schema({
    id: {type:Number},
    user_id: {type:Number},
    content: {type:String},
    post_id: {type:Number},
    comment_id: {type:Number},
    entryDate: {type:Date, default:Date.now}
})

const likeSchema = new Schema({
    id: {type:Number},
    post_id: {type:Number},
    comment_id: {type:Number},
    type: {type:Boolean},
    entryDate: {type:Date, default:Date.now}
})
//_id:false removes default generation of id

const Users = mongoose.model('Users',userSchema,'users')
const Topics = mongoose.model('Topics',topicSchema,'topics')
const Courses = mongoose.model('Courses',courseSchema,'courses')
const mySchemas = {
    'Users':Users,
    'Topics':Topics,
    'Courses':Courses
}



module.exports = mySchemas