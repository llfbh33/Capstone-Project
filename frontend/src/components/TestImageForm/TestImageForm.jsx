// import { useEffect, useState } from "react";
// import { createImage } from "../../redux/image";
// import { useDispatch } from "react-redux";

// function TestImageForm() {
//     const dispatch = useDispatch()
//     // const [userId, setUserId] = useState('')
//     const [image, setImage] = useState('')
//     // const [imageLoading, setImageLoading] = useState(false)

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         let reader = new FileReader();
//         const formData = new FormData();
//         console.log('formData without image', formData)
//         console.log('image before it goes into formData', image)
//         if (image[0]) {
//             reader.readAsDataURL(image[0]);
//           }
//         reader.onload = (readerEvent) => {
//             console.log('saved', readerEvent.target.result)
//         formData.append("image", readerEvent.target.result);

//         // setImageLoading(true);
//         // await dispatch(createImage(formData.image));
//         // history.pushState('/images')
//         }
//         console.log('formData with image', formData)
//     }

//     useEffect(() => {
//         console.log('image', image)
//     }, [image])

//     return (
//         <div>
//             <form onSubmit={handleSubmit} encType="multipart/form-data">
//                 {/* <label>User Id</label>
//                 <input
//                     type='number'
//                     value={userId}
//                     onChange={(e) => setUserId(e.target.value)}></input>
//                 <label>Profile image</label> */}
//                 <input
//                     type='file'
//                     accept='image/*'
//                     onChange={(e) => setImage(e.target.files)}
//                 ></input>
//                 <button type="submit">Add Profile Image</button>
//             </form>
//             <div>
//                 <img src='https://profile-images-pencrafted-capstone.s3.us-west-2.amazonaws.com/pi-default-5.png' />
//             </div>
//         </div>
//     )
// }

// export default TestImageForm;
