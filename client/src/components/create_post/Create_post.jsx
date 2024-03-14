import React, { useState } from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js';
import 'draft-js/dist/Draft.css';
import bold from '../../assets/icons/bold.svg';
import italic from '../../assets/icons/italic.svg';
import './create_post.css';

const Create_post = ({ imgUrl, name, action }) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return 'handled';
        }
        return 'not-handled';
    };

    const mapKeyToEditorCommand = (e) => {
        if (e.keyCode === 9 /* TAB */) {
            const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
            if (newEditorState !== editorState) {
                setEditorState(newEditorState);
            }
            return;
        }
        return getDefaultKeyBinding(e);
    };

    const toggleInlineStyle = (inlineStyle) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    };

    const styleButtonHandler = (e, style) => {
        e.preventDefault();
        toggleInlineStyle(style);
    };

    return (
        <div className="create-post-container">
            <div className='form-group-row'>
                <div className="form-group-title">
                    <h1 className='create-post-header'>Title</h1>
                    <input type="text" className="title-input" placeholder="input title here" />
                </div>
                <div className="form-group-course">
                    <h1 className='create-post-header'>Course</h1>
                    <select className="course-select">
                        <option>Course</option>
                        <option>CCAPDEV</option>
                        <option>CSMATH1</option>
                        <option>CCPROG1</option>
                    </select>
                </div>
            </div>
            <div className='form-group-column'>
                <h1 className='create-post-topic'>Choose topics (separated by comma)</h1>
                <div className="topic-input-container">
                    <input type="text" className="topic-input" placeholder="input topics here" />
                </div>
                <div className="editor-toolbar">
                    <button onMouseDown={(e) => styleButtonHandler(e, 'BOLD')}>
                        <img src={bold} alt="Bold" />
                    </button>
                    <button onMouseDown={(e) => styleButtonHandler(e, 'ITALIC')}>
                        <img src={italic} alt="Italic" />
                    </button>
                </div>
                <div className="text-input">
                    <Editor
                        editorState={editorState}
                        handleKeyCommand={handleKeyCommand}
                        keyBindingFn={mapKeyToEditorCommand}
                        onChange={setEditorState}
                        placeholder="Enter text here..."
                    />
                </div>
                <button className="post-button">Post</button>
            </div>
        </div>
    );
};

export default Create_post;