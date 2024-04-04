import React, { useEffect, useState } from 'react';
import 'draft-js/dist/Draft.css';
import './create_course.css';
import axios from 'axios';

const Create_course = ({user}) => {
    const [courses, setCourses] = useState([]);
    // const [user, setUser] = useState(null);

    // useEffect(() => {
    //     axios.get('${process.env.REACT_APP_API_URL}/api/current_user')
    //       .then(response => {
    //         const { username, _id } = response.data;
    //         setUser({ username, _id }); 
    //       })
    //       .catch(error => {
    //         console.error('Error fetching user:', error);
    //       });
    // }, []);
    const resetForm = () => {
        document.getElementById('title').value = '';
    };

    const handleAddCourse = async(e) => {
        e.preventDefault(); // Prevent default form submission
        const title = document.getElementById('title').value;
        
        await axios.post(`${process.env.REACT_APP_API_URL}/api/courses/add`, {
            course_name: title
        }).then(response => {
            // Handle success
            console.log(response.data);
            alert("Course created successfully!");
        })
        .catch(error => {
            // Handle error
            console.log(error);
        });
        fetchCourses();
        resetForm();
    };

    const fetchCourses = () => {
        //console.log(process.env.REACT_APP_API_URL)  
        if (user) {
            axios.get(`${process.env.REACT_APP_API_URL}/api/courses`)
              .then(res => setCourses(res.data))
              .catch(err => console.log(err));
        }
    }

    useEffect(() => {
        fetchCourses();
    }, [user]);

    const Courses = courses.map((content, index) => 
        <option key={index} value={content._id}>{'c/'+content.name}</option>
    );

    const handleDeleteCourse = async(e) => {
        e.preventDefault(); // Prevent default form submission
        const course = document.getElementById('course').value;
        
        await axios.post(`${process.env.REACT_APP_API_URL}/api/courses/delete`, {
            course_id: course
        }).then(response => {
            // Handle success
            console.log(response.data);
            alert("Course deleted successfully!");
        })
        .catch(error => {
            // Handle error
            console.log(error);
        });
        fetchCourses();
        resetForm();
    };

    return (

        <div className="create-course-container">
                <div className='form-group-row'>
        
                    <div className="form-group-title">
                        <p className='create-course-header'>Course Name</p>
                        <input id='title' type="text" className="title-input" placeholder="Input Course Name Here" />
                    </div>
                </div>
                <button onClick={handleAddCourse} className="course-button">Create Course</button>

                <div className='form-group-row'>
                    <select id='course' className="course-select" placeholder='Course'>
                            <option value="" disabled selected hidden>Choose a Course...</option>
                            {Courses}
                    </select>
                </div>
                <button onClick={handleDeleteCourse} className="course-button">Delete Course</button>
        </div>
    );
};

export default Create_course;