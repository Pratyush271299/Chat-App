// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


// const upload = async (file) => {
//     const storage = getStorage();
//     const storageRef = ref(storage, `images/${Date.now()+ file.name}`);
    
//     const uploadTask = uploadBytesResumable(storageRef, file);
    
    
//     uploadTask.on('state_changed', 
//       (snapshot) => {
        
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log('Upload is ' + progress + '% done');
//         switch (snapshot.state) {
//           case 'paused':
//             console.log('Upload is paused');
//             break;
//           case 'running':
//             console.log('Upload is running');
//             break;
//         }
//       }, 
//       (error) => {
        
//       }, 
//       () => {
        
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             return(downloadURL)
//         });
//       }
//     );
// }

// export default upload;

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const upload = (file) => {
  return new Promise((resolve, reject) => {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${Date.now() + file.name}`);
    
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    uploadTask.on(
      'state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        // Handle unsuccessful uploads
        reject(error); // Reject the promise if an error occurs
      }, 
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL); // Resolve the promise with the download URL
        });
      }
    );
  });
};

export default upload;
