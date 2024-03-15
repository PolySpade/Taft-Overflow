const mongoose = require('mongoose')
const schemas = require('../models/schemas')
const ObjectId = require('mongoose').Types.ObjectId;


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
        aboutme: 'A ccs student'
    },
    {
        username: 'AtorniPulpul',
        name: 'Richmond Tan',
        email: 'richmond_tan@dlsu.edu.ph',
        school_id: 1223476,
        degree: 'CS-NIS',
        aboutme: 'A ccs student too'
    },
    {
        username: 'Blix',
        name: 'Blix Lingat',
        email: 'carl_lingat@dlsu.edu.ph',
        school_id: 12208221,
        degree: 'CS-ST',
        aboutme:'A ccs student too as well'
    },
    {
        username: 'Dax',
        name: 'Dax Calugtong',
        email: 'darylle_calugtong@dlsu.edu.ph',
        school_id: 12142046,
        degree: 'CS-NIS',
        aboutme:'A ccs student as well too'
    },
    {
        username: 'admin',
        name: 'admin',
        email: 'admin@dlsu.edu.ph',
        school_id: 00000000,
        aboutme: 'Admin'
    }
]
/*
multiple_data_save('Topics',topics_data)
multiple_data_save('Courses',courses_data)
multiple_data_save('Users',users_data)
prepareAndSavePostsData()
*/

async function prepareAndSavePostsData() {
    try {
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
