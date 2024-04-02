const mongoose = require('mongoose')
const Schema = mongoose.Schema

//user profile schema
const userSchema = new Schema({
    username: {type: String, unique: true, required: true},
    name: {type:String, required: true},
    email: {type:String, lowercase:true, required: true},
    school_id: {type:Number, unique: true, required: true},
    degree: {type:String, uppercase:true, required: true},
    aboutme: {type:String},
    password: {type:String, required: true},
    profile_img: {type: String}, 
    entryDate: {type:Date, default:Date.now}
})

const topicSchema = new Schema({
    name: {type:String, unique: true}
})

const courseSchema = new Schema({
    name: {type:String, unique: true, uppercase: true},
    entryDate: {type:Date, default:Date.now}
})

//post schema
const postSchema = new Schema({
    type: {type:String}, //announcement, regular
    user_id: {type: Schema.Types.ObjectId, ref:'Users'},
    title: {type:String},
    content: {type:String},
    entryDate: {type:Date, default:Date.now},
    topic_ids: [{type: Schema.Types.ObjectId, ref: 'Topics'}],
    course_id: {type: Schema.Types.ObjectId, ref:'Courses'},
    comment_status: {type:Boolean, default:true}
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
const Posts = mongoose.model('Posts',postSchema,'posts')




const mySchemas = {
    'Users':Users,
    'Topics':Topics,
    'Courses':Courses,
    'Posts':Posts
}





module.exports = mySchemas