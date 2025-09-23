import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useModal } from "../../../context/Modal/Modal";
// import "./NotebookModal.css";
import { thunkEditNotebook, thunkLoadNotebooks } from "../../../redux/notebook";
import { useAppTheme } from "../../../context/Theme/ThemeContext";
import { MdEdit } from "react-icons/md";
import "./ProfileModal.css";

function ProfileModal({user}) {
    console.log('user', user)
    const { theme, setTheme } = useAppTheme();
    const [updateUser, setUpdateUser] = useState({
        name: user.name,
        username: user.username,
        profile_image: user.profile_image,
        theme: user.theme,
    });
    // const dispatch = useDispatch();
    // const user = useSelector(state => state.session.user)
    // const [name, setName] = useState(notebook.name);
    // const [about, setAbout] = useState(notebook.about);
    // const [errors, setErrors] = useState({});
    // const { closeModal } = useModal();

    // useEffect(() => {
    //     const validationErrors = {};
    //     if (name <= 0) validationErrors.name = 'Notebook name is required'
    //     if (name.length > 100) validationErrors.name = 'Notebook name can not be over 100 characters'
    //     if (about.length > 400) validationErrors.about = 'Notebook about section can not be over 400 characters'
    //     setErrors(validationErrors)
    // }, [name, about]);

    // useEffect(() => {
    //     if (about === '') setAbout(' ')
    //   }, [about])

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     if (Object.values(errors).length) return;

    //     const serverResponse = await dispatch(thunkEditNotebook ({
    //         id: notebook.id,
    //         userId: user.id,
    //         name,
    //         about,
    //         })
    //     );

    //     if (serverResponse.name) {
    //         setErrors(serverResponse);
    //     } else {
    //         await dispatch(thunkLoadNotebooks())
    //         setName('')
    //         setAbout('')
    //         await closeModal();
    //     }
    // };

    const handleEditUser = async() => {

    }

    return (
        <div>
            <h1 className="notebook-modal-title">PROFILE MODAL</h1>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                <h3 style={{ textDecoration: 'underline' }}>User Information</h3>
                <MdEdit/>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                <p>Name:</p>
                <p>{updateUser.name}</p>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                <p>User Name:</p>
                <p>{updateUser.username}</p>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                <p>Profile Image</p>
                <img src={updateUser.profile_image} className="profile-image"/>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                <h3 style={{ textDecoration: 'underline' }}>Display</h3>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                <p>Theme</p>
                <select
                    className="theme-select"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value) }
                >
                    <option value='dark'>Dark</option>
                    <option value='light' >Light</option>
                </select>
            </div>
            {/* <form onSubmit={handleSubmit}>
                <div className="notebook-modal-info-1">
                    <label className="notebook-modal-label">Do you want to change the name of your notebook?</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <p className={errors.name ? "notebook-modal-errors" : 'notebook-modal-no-errors'}>{`${name.length}/100`}</p>
                </div>

                <div className="notebook-modal-info-2">
                    <div className="notebook-modal-label">Write a little about what you will use this notebook for!</div>
                    <div>This is not required but it is a helpful way to keep your writing organized.</div>
                    <textarea
                        value={about}
                        rows={12}
                        cols={60}
                        onChange={(e) => setAbout(e.target.value)}
                        required
                    />
                    <p className={errors.about ? "notebook-modal-errors" : 'notebook-modal-no-errors'}>{`${about.length}/400` }</p>
                </div>

                <div className="notebook-modal-button-container">
                  <button type="submit" className="modal-button notebook-modal-button">Submit Changes</button>
                </div>
            </form> */}
        </div>
    );
}

export default ProfileModal;
