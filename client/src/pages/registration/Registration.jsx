import React from 'react';
import { useState, useCallback } from 'react';
import { handleDragOver, handleDrop, handleFileChange } from './scripted.js';

import './registration.css'; // Make sure this is the correct path to your CSS file
import { Link } from 'react-router-dom';
import axios from 'axios';
import Compressor from 'compressorjs';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [degree, setDegree] = useState('');
  const [aboutYou, setAboutYou] = useState('');
  const [email, setEmail] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('Upload Profile Pic');

  const [errors, setErrors] = useState({});

  const onFileChange = useCallback(handleFileChange(setSelectedFile, setUploadMessage), []);
  const onDrop = useCallback(handleDrop(onFileChange), [onFileChange]);

  const validateForm = () => {
    let newErrors = {};
    // Add validation conditions here for each field, e.g.:
    if (!username.trim()) newErrors.username = 'Username is required';
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!idNumber.trim()) newErrors.idNumber = 'ID Number is required';
    if (!degree.trim()) newErrors.degree = 'Degree is required';
    if (!aboutYou.trim()) newErrors.aboutYou = 'Please tell us about yourself';
    if (selectedFile === null) newErrors.selectedFile = 'Profile picture is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      console.log(errors);
      return;
    }

    // Use Compressorjs to handle the image
    new Compressor(selectedFile, {
      quality: 0.6, // Adjust the compression quality as needed
      convertSize: 0, // Prevent converting to JPEG if smaller than this size (keep original format)
      success(result) {
        // Use a canvas to crop and resize the image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
          const dimension = Math.min(img.width, img.height);
          canvas.width = 250; // Target width
          canvas.height = 250; // Target height
          ctx.drawImage(
            img,
            (img.width - dimension) / 2,
            (img.height - dimension) / 2,
            dimension,
            dimension,
            0,
            0,
            250,
            250
          );
          canvas.toBlob((blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob); 
            reader.onload = () => {
              const base64String = reader.result;
              const formData = {
                username, firstName, lastName, password, confirmPassword, idNumber, degree, aboutYou, email,
                profilePic: base64String
              };

              setErrors({}); //clear errors
              console.log(base64String);
              axios.post("http://localhost:4000/api/register", formData)
                .then(response => {
                  alert("Account created successfully!");
                  setUsername('');
                  setFirstName('');
                  setLastName('');
                  setPassword('');
                  setConfirmPassword('');
                  setIdNumber('');
                  setDegree('');
                  setAboutYou('');
                  setEmail('');
                  setSelectedFile(null);
                  setUploadMessage('Upload Profile Pic');
                  // Clear errors here
                  window.location.href = "/";
                })
                .catch(error => {
                  // Handle error
                  if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    alert(`Error: ${error.response.data.message}`);
                  } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                  } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                  }
                });
            };
          }, 'image/jpeg'); // You can change 'image/jpeg' to the appropriate image format
        };
        img.src = URL.createObjectURL(result);
      },
      error(err) {
        console.log("Compression Error: ", err);
        setErrors(prevErrors => ({ ...prevErrors, selectedFile: 'Could not compress and resize file.' }));
      },
    });
};

  return (
    <div className="registration__container-body">
      <div className='registration__container-container'>
        <div className="registration-welcome">Welcome to</div>
        <div className="registration-title">Taft Overflow</div>
        <div className="registration-content">
          <form onSubmit={handleSubmit}>
            <div className="registration-user-details">
            <div className="registration-input-box">
                <input type="text" placeholder="Username" required value={username} onChange={e => setUsername(e.target.value)} />
                {errors.username && <div className="error-message">{errors.username}</div>}
              </div>
              <div className="registration-split-input">

                <div className="registration-input-box registration-split-input1">
                  <input type="text" placeholder="First Name" required value={firstName} onChange={e => setFirstName(e.target.value)} />
                  {errors.firstName && <div className="error-message">{errors.firstName}</div>}
                </div>
                <div className="registration-input-box registration-split-input2">
                <input type="text" placeholder="Last Name" required value={lastName} onChange={e => setLastName(e.target.value)} />
                {errors.lastName && <div className="error-message">{errors.lastName}</div>}
              </div>
              </div>
              <div className="registration-input-box">
                <input type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} />
                {errors.password && <div className="error-message">{errors.password}</div>}
              </div>
              <div className="registration-input-box">
                <input type="password" placeholder="Confirm Password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
              </div>
              <div className="registration-split-input">
                <div className="registration-input-box registration-split-input1">
                  <input type="number" placeholder="ID Number" required value={idNumber} onChange={e => setIdNumber(e.target.value)} />
                  {errors.idNumber && <div className="error-message">{errors.idNumber}</div>}
                </div>
                <div className="registration-input-box registration-split-input2">
                  <input type="text" placeholder="Degree" required value={degree} onChange={e => setDegree(e.target.value)} />
                  {errors.degree && <div className="error-message">{errors.degree}</div>}
                </div>
              </div>

              <div className="registration-about-box">
                <textarea placeholder="About You" required value={aboutYou} onChange={e => setAboutYou(e.target.value)} />
                {errors.aboutYou && <div className="error-message">{errors.aboutYou}</div>}
              </div>

              <div className="registration-input-box">
                <input type="email" placeholder="DLSU Email" required value={email} onChange={e => setEmail(e.target.value)} />
                {errors.email && <div className="error-message">{errors.email}</div>}
              </div>
              <div className="registration-input-box registration-upload-area"
                   onDragOver={handleDragOver}
                   onDrop={onDrop}>
                <label htmlFor="profilePicInput" className={selectedFile ? 'upload-area uploaded' : 'upload-area'}>
                  <p>{uploadMessage}</p>
                  <input type="file" id="profilePicInput" accept=".png, .jpg, .jpeg" hidden onChange={(e) => onFileChange(e.target.files[0])} />
                  {errors.selectedFile && <div className="error-message">{errors.selectedFile}</div>}
                </label>
              </div>
              <div className="registration-register-button">
                <input type="submit" value="Register" className="registration-submit-button"/>
              </div>
              <div className="registration-login">Already registered? <Link to='/login'>Login</Link></div>
            </div>
          </form>
        </div>



      </div>

    </div>
  );
}

export default Registration;
