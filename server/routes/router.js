const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const schemas = require('../models/schemas')
//const sample_data = require('../models/sample')

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const ObjectId = require('mongoose').Types.ObjectId;
const { createHmac } = require('crypto')
require('dotenv/config') //environment variable

passport.use(new LocalStrategy(
  async (username, password, done) => {
      try {
          const user = await schemas['Users'].findOne({ username: { $regex: new RegExp(username, 'i') }  });
          if (!user) {
              return done(null, false, { message: 'Incorrect username.' });
          }
          if (pass_hash(password) !== user.password) {
              return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
      } catch (err) {
          return done(err);
      }
  }
));


passport.serializeUser((user, done) => {
  done(null, user.id); //store id
});


passport.deserializeUser(async (id, done) => {
  try {
      const user = await schemas['Users'].findById(id); //reuse id
      done(null, user);
  } catch (err) {
      done(err);
  }
});

// router.post('/api/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const schema = schemas['Users'];
//     const query = { username: String(username) };
//     const result = await schema.findOne(query).exec();
//     if (result) {
//       if (result.password.toString() === pass_hash(password)) {
//         res.status(200).json({ message: "Success" });
//       } else {
//         res.status(404).json({ message: 'Wrong Password!' });
//       }

//     } else {
//       res.status(404).json({ message: 'No user found with that username' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }

// })



function pass_hash(password) {
  const hash = createHmac('sha256', process.env.SECRET)
    .update(password)
    .digest('hex');
  return hash
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function data_save(data) {
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

async function processArrayObjectID(schema, field, array) {
  const resultsArray = [];

  for (const item of array) {
    const objectId = await findObjectID(schema, field, item);
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

router.get('/api/courses/user/:id', async (req, res) => {
  const user_id = await findObjectID('Users', 'username', req.params.id);
  try {
    const userCourses = await schemas['JoinedCourses'].find({ user_id: user_id }).populate('course_id', 'name');

    // Correct the way objects are constructed in the map function
    const simplifiedUserCourses = userCourses.map(course => ({
      course_name: course.course_id.name
    }));

    res.json(simplifiedUserCourses);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching course-user data', error: error });
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
    const user = await schemas['Users'].findById(req.params.id, '-_id -password -__v'); //filter it out
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

    //search
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


router.post('/api/login', (req, res, next) => {
  // Check if the user is already logged in
  if (req.isAuthenticated()) {
    return res.status(400).json({ message: 'Already logged in' });
  }
  console.log(req.isAuthenticated());

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!user) {
      return res.status(401).json({ message: 'Login failed', reason: info.message });
    }
    req.logIn(user, (loginErr) => {
      if (loginErr) {
        return res.status(500).json({ message: loginErr.message });
      }
      console.log("Logged in");
      return res.status(200).json({ message: 'Login successful', user: { username: user.username } });
    });
  })(req, res, next);
});

router.get('/api/logout', (req, res) => {
//check logout
  if (!req.isAuthenticated()) {
    return res.status(200).json({ message: 'No active session to log out from or already logged out' });
  }

  req.logout(function(err) {
    if (err) {
        console.log('Error in logout:', err);
        return res.status(500).json({ message: 'Error logging out' });
    }
    // Destroy the session data
    req.session.destroy((err) => {
        if (err) {
           return res.status(500).json({ message: 'Failed to destroy session' });
        }
        // Successfully logged out and destroyed the session, send a successful response
        res.status(200).json({ message: 'Logout successful' });
    });
  });
});

router.get('/api/current_user', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(403).json({ message: 'Not authenticated' });
  }
  // Assuming the user object has username and id fields
  //const { username, _id: userId } = req.user;
  res.json(req.user);
});

router.get('/api/vote/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const like = await schemas['Likes'].find({
      $or: [{ post_id: id }, { comment_id: id }]
    }); // Exclude fields like password and __v from the result

    if (!like) {
      return res.status(404).json({ message: 'Record not found' });
    }
    let upvote = 0;
    let downvote = 0;

    like.forEach(element => {
      if (element.like_type === 1) {
        upvote += 1;
      } else if (element.like_type === -1) {
        downvote += 1;
      }
    });

    const totalVotes = {
      upvote,
      downvote
    };

    res.json(totalVotes)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/api/comments/:id', async (req, res) => {
  const id = req.params.id;
  const comments = await schemas['Comments'].find({
    $or: [{ post_id: id }, { comment_id: id }]
  })

});



// router.post('/api/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const schema = schemas['Users'];
//     const query = { username: String(username) };
//     const result = await schema.findOne(query).exec();
//     if (result) {
//       if (result.password.toString() === pass_hash(password)) {
//         res.status(200).json({ message: "Success" });
//       } else {
//         res.status(404).json({ message: 'Wrong Password!' });
//       }

//     } else {
//       res.status(404).json({ message: 'No user found with that username' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }

// })

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
    console.log("New user created " + username);
    res.status(201).json({ message: 'User registered successfully', data: newUser });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during registration' });
  }
});

router.post('/api/posts', async (req, res) => {
  const { title, course, content, topicsArray, username } = req.body;
  const user_id = await findObjectID('Users', 'username', username);
  const course_id = await findObjectID('Courses', 'name', course);
  let new_topicsArray = topicsArray.map(item => ({ name: item }));

  try {
    if (new_topicsArray.some(topic => topic.name.trim() === '')) {
      new_topicsArray = new_topicsArray.filter(topic => topic.name.trim() !== '');
      new_topicsArray.push({ name: 'general' });
    }

    // Save topics first
    await multiple_data_save('Topics', new_topicsArray);

    // Delay execution to ensure topics are saved before proceeding
    await delay(2000);

    let topicsIds = [];

    // Retrieve the IDs of the saved topics
    topicsIds = await processArrayObjectID('Topics', 'name', new_topicsArray.map(topic => topic.name));

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

router.post('/api/join_course', async (req, res) => { //TODO

})

router.post('/api/vote', async (req, res) => {
  const { userId, postId, commentId, voteType } = req.body;
  try {
      let like;
      // Check if voting on a post
      if (postId) {
          like = await schemas['Likes'].findOne({ user_id: userId, post_id: postId });
          if (!like) {
              // Create a new vote record for the post
              like = new schemas.Likes({
                  user_id: userId,
                  post_id: postId,
                  like_type: voteType
              });
          } else {
              // Update the existing vote
              like.like_type = voteType;
          }
      } 
      // Check if voting on a comment
      else if (commentId) {
          like = await schemas['Likes'].findOne({ user_id: userId, comment_id: commentId });
          if (!like) {
              // Create a new vote record for the comment
              like = new schemas.Likes({
                  user_id: userId,
                  comment_id: commentId,
                  like_type: voteType
              });
          } else {
              // Update the existing vote
              like.like_type = voteType;
          }
      } 
      
      await like.save();

      res.status(200).json({ message: "Vote updated successfully", like });
  } catch (error) {
      res.status(500).json({ message: "Error updating vote", error });
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