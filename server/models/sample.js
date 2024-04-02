const mongoose = require('mongoose')
const schemas = require('../models/schemas')
const ObjectId = require('mongoose').Types.ObjectId;
const {createHmac} = require('crypto')
require('dotenv/config') //environment variable

const normalpic = "data:image/png;base64,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"

function pass_hasher(password){
  const hash = createHmac('sha256', process.env.SECRET)
               .update(password)
               .digest('hex');
  return hash
}

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


async function findObjectID(schem, keyName, keyValue) {
    try {
        const schema = schemas[schem];
        const query = {};
        query[keyName] = keyValue; // Using computed property names to set the key and value
        const result = await schema.findOne(query).exec();
        if (result) {
            return result._id.toString();
        } else {
            console.log('No object found with that key and value');
            return null;
        }
    } catch (err) {
        console.error('Error finding object:', err);
        return null;
    }
}


//Sample Array Data
const topics_data = [
    {name: 'id119'},
    {name: 'css'},
    {name:'react'},
    {name: 'integrals'},
    {name: 'nodejs'},
    {name: 'mongodb'},
    {name: 'mongoose'},
    {name: 'loops'},
    {name: 'pointers'},
    {name: 'arrays'},
    {name: 'structs'},
    {name: 'derivatives'},
    {name: 'recursion'},
    {name: 'divide-and-counquer'},
    {name: 'trees'},
    {name: 'grades'},
    {name: 'automata'},
    {name: 'general'},
    {name: 'html'}
]

const courses_data = [
    {name:'ccapdev'},
    {name:'ccdsalg'},
    {name:'csarch'},
    {name:'ccdstru'},
    {name: 'ccprog1'},
    {name: 'ccprog2'},
    {name: 'ccprog3'},
    {name: 'csadprg'},
    {name: 'ccinfom'},
    {name: 'mth101a'},
    {name: 'csmath1'},
    {name: 'csmath2'},
    {name: 'st-math'},
    {name: 'csalgcm'},
    {name: 'stalgcm'},
    {name: 'general'}
]

const users_data = [
    {
        username: 'IceSpade',
        name: 'Donald Xu',
        email: 'xu_xu@dlsu.edu.ph',
        school_id: 12210269,
        degree: 'CS-ST',
        aboutme: 'A ccs student',
        password: pass_hasher('cool1234'),
        profile_img: `${normalpic}`
    },
    {
        username: 'AtorniPulpul',
        name: 'Richmond Tan',
        email: 'richmond_tan@dlsu.edu.ph',
        school_id: 1223476,
        degree: 'CS-NIS',
        aboutme: 'A ccs student too',
        password: pass_hasher('pul1234'),
        profile_img: `${normalpic}`
    },
    {
        username: 'Blix',
        name: 'Blix Lingat',
        email: 'carl_lingat@dlsu.edu.ph',
        school_id: 12208221,
        degree: 'CS-ST',
        aboutme:'A ccs student too as well',
        password: pass_hasher('blix1234'),
        profile_img: `${normalpic}`
    },
    {
        username: 'Dax',
        name: 'Dax Calugtong',
        email: 'darylle_calugtong@dlsu.edu.ph',
        school_id: 12142046,
        degree: 'CS-NIS',
        aboutme:'A ccs student as well too',
        password: pass_hasher('dax1234'),
        profile_img: `${normalpic}`
    },
    {
        username: 'admin',
        name: 'admin',
        email: 'admin@dlsu.edu.ph',
        school_id: 0,
        degree: 'ADMIN',
        aboutme: 'Admin',
        password: pass_hasher('authorized1234'),
        profile_img: `${normalpic}`
    }
]
multiple_data_save('Topics',topics_data)
multiple_data_save('Courses',courses_data)
multiple_data_save('Users',users_data)


function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function prepareAndSavePostsData() {
    try {
        await delay(5000);
        // Resolve all necessary ObjectIds before creating the posts_data
        // User Identifiers
        const userId_AtorniPulpul = await findObjectID('Users', 'username', 'AtorniPulpul');
        const userId_Blix = await findObjectID('Users', 'username', 'Blix');
        const userId_Dax = await findObjectID('Users', 'username', 'Dax');
        const userId_IceSpade = await findObjectID('Users', 'username', 'IceSpade');
        const userId_admin = await findObjectID('Users', 'username', 'admin');

        // Topic Identifiers
        const topicId_id119 = await findObjectID('Topics', 'name', 'id119');
        const topicId_grades = await findObjectID('Topics', 'name', 'grades');
        const topicId_automata = await findObjectID('Topics', 'name', 'automata');
        const topicId_derivatives = await findObjectID('Topics', 'name', 'derivatives');
        const topicId_pointers = await findObjectID('Topics', 'name', 'pointers');
        const topicId_loops = await findObjectID('Topics', 'name', 'loops');
        const topicId_arrays = await findObjectID('Topics', 'name', 'arrays');
        const topicId_structs = await findObjectID('Topics', 'name', 'structs');
        const topicId_recursion = await findObjectID('Topics', 'name', 'recursion');
        const topicId_css = await findObjectID('Topics', 'name', 'css');
        const topicId_html = await findObjectID('Topics', 'name', 'html');
        const topicId_mongoose = await findObjectID('Topics', 'name', 'mongoose');
        const topicId_mongodb = await findObjectID('Topics', 'name', 'mongodb');
        const topicId_integrals = await findObjectID('Topics', 'name', 'integrals');
        const topicId_general = await findObjectID('Topics', 'name', 'general');

        // Course Identifiers
        const courseId_stalgcm = await findObjectID('Courses', 'name', 'stalgcm');
        const courseId_csmath1 = await findObjectID('Courses', 'name', 'csmath1');
        const courseId_ccprog1 = await findObjectID('Courses', 'name', 'ccprog1');
        const courseId_ccprog2 = await findObjectID('Courses', 'name', 'ccprog2');
        const courseId_ccapdev = await findObjectID('Courses', 'name', 'ccapdev');
        const courseId_stmath = await findObjectID('Courses', 'name', 'st-math');
        const courseId_general = await findObjectID('Courses', 'name', 'general');

        



        // Now that we have the ObjectIds, we can construct the posts_data with the resolved ids
        const posts_data = [
            {
                type: 'regular',
                user_id: new ObjectId(userId_AtorniPulpul),
                title: 'Help ME',
                content: 'I want to get a 4.0',
                topic_ids: [new ObjectId(topicId_id119), new ObjectId(topicId_grades)],
                course_id: new ObjectId(courseId_stalgcm)
            },
            {
                type: 'regular',
                user_id: new ObjectId(userId_Blix),
                title: 'I wanna advance study',
                content: 'I heard STALGCM is hard. Any tips and what to study?',
                topic_ids: [new ObjectId(topicId_grades)],
                course_id: new ObjectId(courseId_stalgcm)
            },
            {
                type: 'regular',
                user_id: new ObjectId(userId_Dax),
                title: 'How do I know if something is a Meely or Moore Machine?',
                content: 'The title says it all.',
                topic_ids: [new ObjectId(topicId_automata)],
                course_id: new ObjectId(courseId_stalgcm)
            },
            {
                type: 'regular',
                user_id: new ObjectId(userId_Blix),
                title: 'CSALGCM and STALGCM',
                content: 'Do I need to master CSALGCM in order to do well in STALGCM?',
                topic_ids: [new ObjectId(topicId_grades)],
                course_id: new ObjectId(courseId_stalgcm)
            },
            {
                type: 'regular',
                user_id: new ObjectId(userId_IceSpade),
                title: 'How do I pass STALGCM?',
                content: 'THE TWO EXAMS WERE SUPER HARD AND I FEEL LIKE FAILING THIS COURSE. HELP ME!',
                topic_ids: [new ObjectId(topicId_automata), new ObjectId(topicId_grades)],
                course_id: new ObjectId(courseId_stalgcm)
            },
            {
                type: 'regular',
                user_id: new ObjectId(userId_AtorniPulpul),
                title: 'Derivatives',
                content: 'How do I understand the formal definition of derivatives?',
                topic_ids: [new ObjectId(topicId_derivatives)],
                course_id: new ObjectId(courseId_csmath1)
            },
            {
                type: 'regular',
                user_id: new ObjectId(userId_Blix),
                title: 'I wanna advance study',
                content: 'I want to get a 4.0 in CSMATH1. Any topics to study early?',
                topic_ids: [new ObjectId(topicId_grades)],
                course_id: new ObjectId(courseId_csmath1)
            },
            {
                type: 'regular',
                user_id: new ObjectId(userId_Dax),
                title: 'Conic Sections',
                content: 'Why do we need conic sections in CSMATH1???',
                topic_ids: [new ObjectId(topicId_derivatives)],
                course_id: new ObjectId(courseId_csmath1)
            },
            {
                type: 'regular',
                user_id: new ObjectId(userId_Blix),
                title: 'Power Rule',
                content: 'Who invented this rule? I love it!',
                topic_ids: [new ObjectId(topicId_derivatives)],
                course_id: new ObjectId(courseId_csmath1)
            },
            {
                type: 'regular',
                user_id: new ObjectId(userId_IceSpade),
                title: 'I DIDN\'T GET EXEMPT FOR THE FINAL EXAM',
                content: 'I GOT AN 88% IN QUIZ 2 BUT THE MINIMUM IS 89% FOR ALL QUIZZES. T_T',
                topic_ids: [new ObjectId(topicId_derivatives), new ObjectId(topicId_grades)],
                course_id: new ObjectId(courseId_csmath1)
            },
            {
                type: 'regular',
                user_id: new ObjectId(userId_AtorniPulpul),
                title: 'Hands On Exam',
                content: 'Hi! I\'m pretty nervous because this is my first coding exam. Any tips?',
                topic_ids: [new ObjectId(topicId_grades)],
                course_id: new ObjectId(courseId_ccprog1)
            },
            {
                type: 'regular',
                user_id: new ObjectId(userId_Blix),
                title: 'Pointers',
                content: 'I don\'t understand pointers. Help me! T_T',
                topic_ids: [new ObjectId(topicId_pointers)],
                course_id: new ObjectId(courseId_ccprog1)
            },
            {
                type: 'regular',
                user_id: new ObjectId(userId_Dax),
                title: 'Loops',
                content: 'When to use one of the three loops?',
                topic_ids: [new ObjectId(topicId_loops)],
                course_id: new ObjectId(courseId_ccprog1)
            },
            {
                type: 'regular',
                user_id: new ObjectId(userId_Blix),
                title: 'For Loops',
                content: 'How do I understand the syntax of the for loop?',
                topic_ids: [new ObjectId(topicId_loops)],
                course_id: new ObjectId(courseId_ccprog1)
            },
            {
                type: 'regular',
                user_id: new ObjectId(userId_IceSpade),
                title: 'Tracing Code',
                content: 'Any tips on how to trace code in CCPROG1 most especially with pointers?',
                topic_ids: [new ObjectId(topicId_pointers)],
                course_id: new ObjectId(courseId_ccprog1)
            },
            {
                type: 'regular',
                user_id: new ObjectId(userId_AtorniPulpul),
                title: 'Array Name Being a Pointer',
                content: 'I do not understand how, given an array A[5], the A variable itself is synonymous to the pointer of the first element.',
                topic_ids: [new ObjectId(topicId_arrays), new ObjectId(topicId_pointers)],
                course_id: new ObjectId(courseId_ccprog2)
            },
            {
                type: 'regular',
                user_id: new ObjectId(userId_Blix),
                title: 'How to efficiently trace arrays of structs?',
                content: 'I just did some HO2 practice and the structs are so hard to trace!',
                topic_ids: [new ObjectId(topicId_structs), new ObjectId(topicId_arrays)],
                course_id: new ObjectId(courseId_ccprog2)
            },
            {
                type: 'regular',
                user_id: new ObjectId(userId_Dax),
                title: '2D or more dimensional arrays',
                content: '3D and above arrays are so weird! What are their usual applications in the real world?',
                topic_ids: [new ObjectId(topicId_loops), new ObjectId(topicId_arrays)],
                course_id: new ObjectId(courseId_ccprog2)
            },
            {
                type: 'regular',
                user_id: new ObjectId(userId_Blix),
                title: 'Recursion Joke',
                content: 'In order to understand recursion, you must understand recursion. xD',
                topic_ids: [new ObjectId(topicId_recursion)],
                course_id: new ObjectId(courseId_ccprog2)
            },
            {
                type: 'regular',
                user_id: new ObjectId(userId_IceSpade),
                title: 'Recursion Tips',
                content: 'Any tips on how to trace recursion???',
                topic_ids: [new ObjectId(topicId_recursion)],
                course_id: new ObjectId(courseId_ccprog2)
            },
            {
                type: 'regular',
                user_id: new ObjectId(userId_AtorniPulpul),
                title: 'Mini Challenge 1',
                content: 'How do I use divs and flexboxes properly?',
                topic_ids: [new ObjectId(topicId_css), new ObjectId(topicId_html)],
                course_id: new ObjectId(courseId_ccapdev)
            },
            {
                type: 'regular',
                user_id: new ObjectId(userId_Blix),
                title: 'Mongoose and MongoDB for beginners',
                content: 'Hello! Any tips for Mongoose and MongoDB?',
                topic_ids: [new ObjectId(topicId_mongoose), new ObjectId(topicId_mongodb)],
                course_id: new ObjectId(courseId_ccapdev)
            },
            {
                type: 'announcement',
                user_id: new ObjectId(userId_admin),
                title: 'Grades curve',
                content: 'I am disappointed by your performance in STALGCM. For this, I have to curve all of your grades.',
                topic_ids: [new ObjectId(topicId_grades)],
                course_id: new ObjectId(courseId_stalgcm)
            },
            {
                type: 'announcement',
                user_id: new ObjectId(userId_admin),
                title: 'No classes today',
                content: 'No classes today because I don\'t feel like teaching.',
                topic_ids: [new ObjectId(topicId_pointers)],
                course_id: new ObjectId(courseId_ccprog1)
            },
            {
                type: 'announcement',
                user_id: new ObjectId(userId_admin),
                title: 'Exam tomorrow',
                content: 'Please be reminded that you have an exam at 1PM until 2:30PM. Your room is G202. Coverage is all topics.',
                topic_ids: [new ObjectId(topicId_derivatives), new ObjectId(topicId_integrals)],
                course_id: new ObjectId(courseId_stmath)
            },
            {
                type: 'announcement',
                user_id: new ObjectId(userId_admin),
                title: 'Pre-Enlistment Reminder',
                content: 'Please be reminded that pre-enlistment starts tomorrow until Friday. No pre-enlistment, no DL privileges.',
                topic_ids: [new ObjectId(topicId_general)],
                course_id: new ObjectId(courseId_general)
            },
            {
                type: 'announcement',
                user_id: new ObjectId(userId_admin),
                title: 'Need help with your subjects?',
                content: 'Do you need help with your subjects? The Peer Tutors Society is there for you. Go to their Facebook page but be aware that they cannot do your MPs.',
                topic_ids: [new ObjectId(topicId_general)],
                course_id: new ObjectId(courseId_general)
            }
        ];
        
        multiple_data_save('Posts', posts_data);
        // Assuming multiple_data_save can handle posts_data correctly
        
    } catch (error) {
        console.error('Error preparing or saving posts data:', error);
    }
}

prepareAndSavePostsData()
//multiple_data_save('Posts',posts_data)




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

//
