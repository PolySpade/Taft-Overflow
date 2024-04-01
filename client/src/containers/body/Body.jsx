import React, { useState, useCallback } from 'react';
import './body.css';
import { handleDragOver, handleDrop, handleFileChange } from './scripted.js';

const Body = () => {
  
  // State hooks for form inputs
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [degree, setDegree] = useState('');
  const [aboutYou, setAboutYou] = useState('');
  const [email, setEmail] = useState('');
  // New state for handling the file upload
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('Upload Profile Pic'); // Initial message

  // Function to handle file change, using currying to pass in additional states
  const onFileChange = useCallback(handleFileChange(setSelectedFile, setUploadMessage), []);

  // Wrap external handleDrop function, passing our custom onFileChange function
  const onDrop = useCallback(handleDrop(onFileChange), [onFileChange]);

  // Form submit handler
  // Example of a submit handler
  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement registration logic here
    console.log("Form submitted:", { username, firstName, lastName, password, confirmPassword, idNumber, degree, aboutYou, email });
  };

  return (
    <div className="container">
      <div className="welcome">Welcome to</div>
      <div className="title">Taft Overflow</div>
      <div className="content">
        <form onSubmit={handleSubmit}>
                    <div className="user-details">
                      <div className="input-box">
                        <input type="text" placeholder="Username" required value={username} onChange={e => setUsername(e.target.value)} />
                      </div>
                      <div className="input-box split-input">
                        <div className="input-box split-input1">
                          <input type="text" className="first-name" placeholder="First Name" required value={firstName} onChange={e => setFirstName(e.target.value)} />
                        </div>
                        <div className="input-box split-input2">
                          <input type="text" placeholder="Last Name" required value={lastName} onChange={e => setLastName(e.target.value)} />
                        </div>
                      </div>
                      <div className="input-box">
                        <input type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} />
                      </div>
                      <div className="input-box split-input">
                        <div className="input-box split-input1">
                          <input type="text" className="first-name" placeholder="ID Number" required value={idNumber} onChange={e => setIdNumber(e.target.value)} />
                        </div>
                        <div className="input-box split-input2">
                          <input type="text" placeholder="Degree" required value={degree} onChange={e => setDegree(e.target.value)} />
                        </div>
                      </div>
                      <div className="input-box">
                        <input type="password" placeholder="Confirm Password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                      </div>
                      <div className="input-box">
                        <input type="text" placeholder="About You" required value={aboutYou} onChange={e => setAboutYou(e.target.value)} />
                      </div>
                      <div className="input-box">
                        <input type="email" placeholder="DLSU Email" required value={email} onChange={e => setEmail(e.target.value)} />
                      </div>
                      <div className="input-box profile-pic"
               onDragOver={handleDragOver}
               onDrop={onDrop}>
            <label htmlFor="profilePicInput" className={selectedFile ? 'upload-area uploaded' : 'upload-area'}>
              <p>{uploadMessage}</p>
              <input type="file" id="profilePicInput" accept=".png, .jpg, .jpeg" hidden onChange={(e) => onFileChange(e.target.files[0])} />
            </label>
          </div>
                      <div className="RegisterButton">
                        <div className="button">
                          <input type="submit" value="Register" />
                          <div className="login">Already registered? <span>Log in</span></div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            );
          }

export default Body;
