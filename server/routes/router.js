const express = require('express')
const bodyParser = require('body-parser');
const router = express.Router()
const schemas = require('../models/schemas')
//const sample_data = require('../models/sample')

const ObjectId = require('mongoose').Types.ObjectId;
const {createHmac} = require('crypto')
require('dotenv/config') //environment variable

function pass_hash(password){
  const hash = createHmac('sha256', process.env.SECRET)
               .update(password)
               .digest('hex');
  return hash
}

function delay(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function data_save(data){
  try {
      await data.save();
      console.log('Data saved successfully');
  } catch (error) {
      console.log('Data exists');
  }
}

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

async function processArrayObjectID(schema,field,array) {
  const resultsArray = [];
  
  for (const item of array) {
    const objectId = await findObjectID(schema,field,item);
    resultsArray.push(objectId);
  }
  
  return resultsArray;
}

router.get('/api/topics', async (req, res) => {
  try {
      if (!schemas['Topics']) {
          throw new Error("Schema 'Topics' not found");
      }
      const result = await schemas['Topics'].find();
      res.json(result);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

router.get('/api/courses', async (req, res) => {
  try {
      if (!schemas['Courses']) {
          throw new Error("Schema 'Courses' not found");
      }
      const result = await schemas['Courses'].find();
      res.json(result);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

router.get('/api/users', async (req, res) => {
  try {
      if (!schemas['Users']) {
          throw new Error("Schema 'Users' not found");
      }
      const result = await schemas['Users'].find();
      res.json(result);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

router.get('/api/users/:id', async (req, res) => {
  try {
      const user = await schemas['Users'].findById(req.params.id,'-_id -password -__v'); //filter it out
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

router.get('/api/posts', async (req, res) => {
  try {
      if (!schemas.Posts) {
          throw new Error(`Schema Posts not found`);
      }
      const searchQuery = req.query.search;
      let query = {};

      if (searchQuery) {
          const searchRegex = new RegExp(searchQuery, 'i'); 
          query = {
              $or: [
                  { title: { $regex: searchRegex } },
                  { content: { $regex: searchRegex } }
              ]
          };
      }


      const result = await schemas.Posts.find(query)
          .populate({
              path: 'topic_ids', 
              select: 'name'
          })
          .populate({
              path: 'course_id', 
              select: 'name'
          })
          .populate({
              path: 'user_id', 
              select: 'username profile_img'
          });
                      
      res.json(result);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


// router.get('/api/posts', async (req, res) => {
//   try {
//       // Ensure the schema exists before trying to use it
//       if (!schemas.Posts) {
//           throw new Error(`Schema Posts not found`);
//       }
//       const result = await schemas.Posts.find()
//                       .populate({
//                         path: 'topic_ids', 
//                         select: 'name'
//                       })
//                       .populate({
//                         path: 'course_id', 
//                         select: 'name'
//                       })
//                       .populate({
//                         path: 'user_id', 
//                         select: 'username profile_img'
//                       });
                      
//       res.json(result);
//   } catch (error) {
//       res.status(500).json({ message: error.message });
//   }
// });

router.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const schema = schemas['Users'];
    const query = { username: String(username) }; 
    const result = await schema.findOne(query).exec();
    if (result) {
        if(result.password.toString() === pass_hash(password)){
           res.status(200).json({ message: "Success" });
        }else{
           res.status(404).json({ message: 'Wrong Password!' });
        }
         
    } else {
         res.status(404).json({ message: 'No user found with that username' });
    }
} catch (error) {
  res.status(500).json({ message: error.message });
}

})

router.post('/api/register', async (req, res) => {
  const { username, firstName, lastName, password, idNumber, degree, aboutYou, email, profilePic } = req.body;
  
  try {
    const userByUsername = await schemas['Users'].findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });
    if (userByUsername) {
        return res.status(409).json({ message: 'Username is already in use' });
    }
    
    const userByEmail = await schemas['Users'].findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
    if (userByEmail) {
        return res.status(409).json({ message: 'Email is already in use' });
    }
    
    const userById = await schemas['Users'].findOne({ school_id: idNumber });
    if (userById) {
        return res.status(409).json({ message: 'ID Number is already in use' });
    }


    const hashedPassword = pass_hash(password);

    const newUser = await schemas.Users.create({
        username,
        name: `${firstName} ${lastName}`,
        email,
        school_id: idNumber,
        degree,
        aboutme: aboutYou,
        password: hashedPassword,
        profile_img: profilePic
    });
    console.log("New user created "+ username);
    res.status(201).json({ message: 'User registered successfully', data: newUser });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during registration' });
  }
});

router.post('/api/posts', async (req, res) => {
  const { title, course, content, topicsArray, username } = req.body;
  const user_id = await findObjectID('Users', 'username', username);
  const course_id = await findObjectID('Courses','name', course);
  const new_topicsArray = topicsArray.map(item => ({name: item}));

  multiple_data_save('Topics',new_topicsArray); //save the new topics, before inserting schema
  delay(2000);

  const topicsIds= await processArrayObjectID('Topics','name',topicsArray);
  try {
      
      const newPost = new schemas.Posts({
        type: 'regular',
        user_id: new ObjectId(user_id),
        title: title,
        content: content,
        course_id: new ObjectId(course_id),
        topic_ids: topicsIds.map(id => new ObjectId(id))
      });

      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});



//createGetRoute('/api/posts','Posts')

/*
router.get('/api/topics', async (req,res) => {
  try{
    const topics = await schemas.Topics.find();
    res.json(topics)
  }
  catch(error){
    res.status(500).json({ message: error.message });
  }
})

router.get('/api/courses', async (req,res) => {
  try{
    const topics = await schemas.Courses.find();
    res.json(topics)
  }
  catch(error){
    res.status(500).json({ message: error.message });
  }
})
*/

module.exports = router