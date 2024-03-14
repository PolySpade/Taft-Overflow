const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas')
const sample_data = require('../models/sample')


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

createGetRoute('/api/topics', 'Topics')
createGetRoute('/api/courses', 'Courses')

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
                        select: 'name profile_img'
                      });
                      
      res.json(result);
  } catch (error) {
      res.status(500).json({ message: error.message });
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