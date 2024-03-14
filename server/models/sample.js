const mongoose = require('mongoose')
const schemas = require('../models/schemas')

//Sample Single Data

const topics = new schemas.Topics(
    {name:'id119'}
)
async function data_save(data){
    try {
        await data.save();
        console.log('Data saved successfully');
    } catch (error) {
        console.log('Data exists');
    }
}
//data_save(topics)

function multiple_data_save(schemaName, topics_data) {
    const Schema = schemas[schemaName];
    if (!Schema) {
        console.error('Schema not found:', schemaName);
        return;
    }
    for (const data of topics_data) {
        const newTopic = new Schema(data); 
        data_save(newTopic);
    }
}

async function findObjectID(schemaName,topicName) {
    const Schema = schemas[schemaName];
    try {
        const topic = await Schema.findOne({ name: topicName }).exec();
        if (topic) {
            console.log('Found topic ObjectId:', topic._id);
            return topic._id;
        } else {
            console.log('No topic found with that name');
            return null;
        }
    } catch (err) {
        console.error('Error finding topic:', err);
        return null;
    }
}


//Sample Array Data
const topics_data = [
    {name:'id119'},
    {name:'css'},
    {name:'react'}
]

const courses_data = [
    {name:'ccapdev'},
    {name:'ccdsalg'},
    {name:'csarch'},
    {name:'ccdstru'},
]

const users_data = [
    {
        name: 'Donald Xu',
        email: 'xu_xu@dlsu.edu.ph',
        school_id: 12210269,
        degree: 'CS-ST',
        aboutme: 'A ccs student'
    },
    {
        name: 'Richmond Tan',
        email: 'richmond_tan@dlsu.edu.ph',
        school_id: 1223476,
        degree: 'CS-ST',
        aboutme: 'A ccs student too'
    }
]

multiple_data_save('Topics',topics_data)
multiple_data_save('Courses',courses_data)
multiple_data_save('Users',users_data)





console.log(findObjectID('Topics','id119'))






/*
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
*/

/*

const posts_data = [
    {
        type: 'regular',
        user_id: new mongoose.Types.ObjectId('65ebbdda56992d33319fb3a5'),
        title: 'Help me in HTML!',
        content: 'Test Content',
        topic_ids: [new mongoose.Types.ObjectId('65eb09570c6a4e572087f56c')],
        course_id: new mongoose.Types.ObjectId('65eb09570c6a4e572087f56f')
    },
    {
        type: 'regular',
        user_id: new mongoose.Types.ObjectId('65ebbdda56992d33319fb3a6'),
        title: 'Help me in HTML!',
        content: 'Test Content',
        topic_ids: [new mongoose.Types.ObjectId('65eb09570c6a4e572087f56d')],
        course_id: new mongoose.Types.ObjectId('65eb09570c6a4e572087f56f')
    }
]

*/





//save

//multiple_data_save('Posts',posts_data)
