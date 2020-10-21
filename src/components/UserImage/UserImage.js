import React, { useState } from 'react';
import api from '../../services/api';

function UpdateUserImage({actualUser}) {
   
    const [baseImage, setBaseImage] = useState("");

    const uploadImage = async (e) => {
    const file = e.target.files[0];
    
    const base64 = await convertBase64(file);

    const response = await api.put(`/user/${actualUser.email}`, {
        name: actualUser.name, lastName: actualUser.lastName,  userImage: base64,
    });
    setBaseImage(base64);
    console.log(base64);
    
  };
  
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
        
      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div className="App">
      <input
        type="file"
        onChange={(e) => {
          uploadImage(e);
        }}
      />
      <br></br>
      <img src={baseImage} height="200px" />
    </div>
  );
}

export default UpdateUserImage;