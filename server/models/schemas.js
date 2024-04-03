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
    user_id: {type: Schema.Types.ObjectId, ref: 'Users'},
    content: {type: String},
    post_id: {type: Schema.Types.ObjectId, ref: 'Posts'},
    comment_id: {type: Schema.Types.ObjectId, ref: 'Comments'}, 
    entryDate: {type: Date, default: Date.now}
});


const likeSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'Users'},
    post_id: {type: Schema.Types.ObjectId, ref: 'Posts'},
    comment_id: {type: Schema.Types.ObjectId, ref: 'Comments'},
    like_type: {type: Number, default: 1}, // true for like, false for dislike
    entryDate: {type: Date, default: Date.now}
});

const joinedCoursesSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'Users'},
    course_id: {type: Schema.Types.ObjectId, ref: 'Courses'},
    entryDate: {type:Date, default:Date.now}
})

const Users = mongoose.model('Users',userSchema,'users')
const Topics = mongoose.model('Topics',topicSchema,'topics')
const Courses = mongoose.model('Courses',courseSchema,'courses')
const Posts = mongoose.model('Posts',postSchema,'posts')
const Comments = mongoose.model('Comments',commentSchema,'comments')
const Likes = mongoose.model('Likes',likeSchema,'likes')
const JoinedCourses = mongoose.model('JoinedCourses',joinedCoursesSchema,'joinedCourses')


const mySchemas = {
    'Users':Users,
    'Topics':Topics,
    'Courses':Courses,
    'Posts':Posts,
    'Comments':Comments,
    'Likes':Likes,
    'JoinedCourses': JoinedCourses
}


module.exports = mySchemas