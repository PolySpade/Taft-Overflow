import React, { useEffect, useState } from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js';
import 'draft-js/dist/Draft.css';
import bold from '../../assets/icons/bold.svg';
import italic from '../../assets/icons/italic.svg';
import underline from '../../assets/icons/underline.svg';
import strikethrough from '../../assets/icons/strikethrough.svg';
import './create_post.css';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Create_post = () => {
    // const [editorState, setEditorState] = useState(EditorState.createEmpty());

    // const handleKeyCommand = (command, editorState) => {
    //     const newState = RichUtils.handleKeyCommand(editorState, command);
    //     if (newState) {
    //         setEditorState(newState);
    //         return 'handled';
    //     }
    //     return 'not-handled';
    // };

    // const mapKeyToEditorCommand = (e) => {
    //     if (e.keyCode === 9 /* TAB */) {
    //         const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
    //         if (newEditorState !== editorState) {
    //             setEditorState(newEditorState);
    //         }
    //         return;
    //     }
    //     return getDefaultKeyBinding(e);
    // };

    // const toggleInlineStyle = (inlineStyle) => {
    //     setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    // };

    // const styleButtonHandler = (e, style) => {
    //     e.preventDefault();
    //     toggleInlineStyle(style);
    // };

    const [courses, setCourses] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:4000/api/current_user')
          .then(response => {
            const { username, _id } = response.data;
            setUser({ username, _id }); 
          })
          .catch(error => {
            console.error('Error fetching user:', error);
          });
    }, []);

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:4000/api/courses/user/${user.username}`)
              .then(res => setCourses(res.data))
              .catch(err => console.log(err));
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
        const topicsArray = topics.split(' ').map(topic => topic.replace(/^#/, ''));
    
        const formData = {
            title,
            course,
            content,
            topicsArray,
            username: String(user.username)
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
                        <p className='create-post-header'>Course</p>
                        <select id='course' className="course-select" placeholder='Course'>
                            <option value="" disabled selected hidden>Choose a Course...</option>
                            {Courses}
                        </select>
                    </div>
                </div>
            <div className='form-group-column'>
                
                {/* <div className="editor-toolbar">
                    <button onMouseDown={(e) => styleButtonHandler(e, 'BOLD')}>
                        <img src={bold} alt="Bold" />
                    </button>
                    <button onMouseDown={(e) => styleButtonHandler(e, 'UNDERLINE')}>
                        <img src={underline} alt="Underline" />
                    </button>
                    <button onMouseDown={(e) => styleButtonHandler(e, 'STRIKETHROUGH')}>
                        <img src={strikethrough} alt="Strikethrough" />
                    </button>
                    <button onMouseDown={(e) => styleButtonHandler(e, 'ITALIC')}>
                        <img src={italic} alt="Italic" />
                    </button>
                </div> */}
                {/* 
                    <div className="text-input">
                    <Editor
                        editorState={editorState}
                        handleKeyCommand={handleKeyCommand}
                        keyBindingFn={mapKeyToEditorCommand}
                        onChange={setEditorState}
                        placeholder="Enter text here..."
                    />
                    </div> */}
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