// import { useEffect, useState } from "react";
// import { thunkLogin } from "../../redux/session";
// import { useDispatch, useSelector } from "react-redux";
// import { useModal } from "../../context/Modal";

// function EntryPreviewPage() {

//     const {notebookId, entryId} = useParams();
//     const entry = useSelector(state => state.entries[entryId]);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [content, setContent] = useState('');
//     const [name, setName] = useState("");
//     const [isPublic, setIsPublic] = useState('Publish')
//     const [errors, setErrors] = useState({});
//     const { closeModal } = useModal();
//     const notebook = useSelector(state => state.notebooks[notebookId])

//     return (
//         <div>
//         <form onSubmit={handleSave}>
//           <div id='entrypage-entry-notebook-title'>
//               <h2>{`Notebook: ${notebook?.name}`}</h2>
//               <h1>{`Entry: ${entry?.name}`}</h1>
//           </div>
//           <h1 id='homepage-underline'></h1>
//           <div className="entry-content-container">

//                 <div className="entry-toolbar-n-btns-container">
//                   <div>
//                     this is the tool bar
//                   </div>
//                   <div id="entry-buttons-container">
//                     <button className="modal-button entry-button" type='submit'>Save</button>
//                     <NavLink
//                         to='/notebook/:notebookId/entries/:entryId/preview'
//                         className="modal-button entry-button"
//                       >Preview</NavLink>
//                     <button
//                         className="modal-button entry-button"
//                         onClick={(publicSwitch)}
//                       >{isPublic}</button>
//                     <button className="modal-button entry-button">Delete</button>
//                   </div>
//                 </div>
//           <div className="entry-content-input-container">
//             <div>{entry?.content}</div>
//           </div>
//           </div>
//           </form>
//     </div>
//     )
// }


// export default EntryPreviewPage
