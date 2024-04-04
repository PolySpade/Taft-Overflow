import React, { useEffect, useState } from 'react';
import 'draft-js/dist/Draft.css';
import './create_post.css';
import axios from 'axios';

const Create_post = ({user}) => {
    const [courses, setCourses] = useState([]);
    const [isAdmin,setAdmin]=useState(false);
    // const [user, setUser] = useState(null);

    // useEffect(() => {
    //     axios.get('http://localhost:4000/api/current_user')
    //       .then(response => {
    //         const { username, _id } = response.data;
    //         setUser({ username, _id }); 
    //       })
    //       .catch(error => {
    //         console.error('Error fetching user:', error);
    //       });
    // }, []);

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:4000/api/courses/user/${user.username}`)
              .then(res => setCourses(res.data))
              .catch(err => console.log(err));
        }

        if(user.username === 'admin'){
            setAdmin(true);
        }
    }, [user]);
      
    const Courses = courses.map((content, index) => 
        <option key={index} value={content.course_name}>{'c/'+content.course_name}</option>
    );

    const resetForm = () => {
        document.getElementById('title').value = '';
        document.getElementById('course').value= '';
        document.getElementById('content').value= '';
        document.getElementById('topics').value= '';
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        const title = document.getElementById('title').value;
        const course = document.getElementById('course').value;
        const content = document.getElementById('content').value;
        const topics = document.getElementById('topics').value;
        //const type = document.getElementById('type').value;
        const topicsArray = topics.split(' ').map(topic => topic.replace(/^#/, ''));
        let type = 'regular';

        if(isAdmin){
            type = document.getElementById('type').value;
        }
        
        const formData = {
            title,
            course,
            content,
            topicsArray,
            username: String(user.username),
            type
        };
        
        axios.post("http://localhost:4000/api/posts", formData)
            .then(response => {
                // Handle success
                console.log(response.data);
                alert("Post created successfully!");
                window.location.href = "/";
            })
            .catch(error => {
                // Handle error
                console.log(error);
            });
            
        console.log(formData);
        resetForm();
    };





    return (

        <div className="create-post-container">
                <div className='form-group-row'>
        
                    <div className="form-group-title">
                        <p className='create-post-header'>Title</p>
                        <input id='title' type="text" className="title-input" placeholder="Input Title Here" />
                    </div>
                    <div className="form-group-course">
                        
                        {isAdmin &&(
                            <div>
                        <p className='create-post-header-type'>Type</p>
                        <select id='type' className="course-select" placeholder='Type'>
                            <option value="" disabled selected hidden>Choose a type...</option>
                            <option value="announcement">Announcement</option>
                            <option value="regular">Regular Post</option>
                        </select>
                        </div>
                        )
                        }
                    <div>
                        <p className='create-post-header-type'>Course</p>
                        <select id='course' className="course-select" placeholder='Course'>
                            <option value="" disabled selected hidden>Choose a Course...</option>
                            {Courses}
                        </select></div>
                    </div>
                </div>
            <div className='form-group-column'>
                <p className='create-post-topic'>Content:</p>
                <textarea id='content' className="text-input" placeholder="Write a something..." />

                <p className='create-post-topic'>Enter topics in the format [#topic] Example:"#dlsu #id120"</p>
                <div className="topic-input-container">
                    <input id='topics' type="text" className="topic-input" placeholder="Input Topics Here" />
                </div>
                <button onClick={handleSubmit} className="post-button">Post</button>
            </div>
        </div>
    );
};

export default Create_post;