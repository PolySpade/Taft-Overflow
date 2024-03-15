const express = require('express')
const bodyParser = require('body-parser');
const router = express.Router()
const schemas = require('../models/schemas')
const sample_data = require('../models/sample')

const ObjectId = require('mongoose').Types.ObjectId;

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

function createGetRoute(path, schema) {
  router.get(path, async (req, res) => {
      try {
          // Ensure the schema exists before trying to use it
          if (!schemas[schema]) {
              throw new Error(`Schema '${schema}' not found`);
          }
          const result = await schemas[schema].find();
          res.json(result);
      } catch (error) {
          res.status(500).json({ message: error.message });
      }
  });
}

async function processArrayObjectID(schema,field,array) {
  const resultsArray = [];
  
  for (const item of array) {
    const objectId = await findObjectID(schema,field,item);
    resultsArray.push(objectId);
  }
  
  return resultsArray;
}

createGetRoute('/api/topics', 'Topics')
createGetRoute('/api/courses', 'Courses')
createGetRoute('/api/users', 'Users')


router.get('/api/posts', async (req, res) => {
  try {
      // Ensure the schema exists before trying to use it
      if (!schemas.Posts) {
          throw new Error(`Schema Posts not found`);
      }
      const result = await schemas.Posts.find()
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