// formHelpers.js

// Prevents default behavior for dragover
export const handleDragOver = (event) => {
    event.preventDefault();
  };
  
  // Processes files when dropped
  export const handleDrop = (handleFileChange) => (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handleFileChange(files[0]);
    }
  };
  
  // Validates and sets the file
  export const handleFileChange = (setSelectedFile, setUploadMessage) => (file) => {
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      setSelectedFile(file);
      setUploadMessage("Image submitted"); // Message updated on successful image submission
    } else {
      alert("Please select a valid image file (PNG or JPG)");
    }
  };