import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { thunkCreateNotebook } from "../../../redux/notebook";
import { useModal } from "../../../context/Modal";
import "./NewNotebookModal.css";

function NewNotebookFormModal() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.session.user)
    const [name, setName] = useState('');
    const [about, setAbout] = useState(" ");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    useEffect(() => {
      const validationErrors = {};
      if (name.length <= 0) validationErrors.name = 'Notebook name is required'
      if (name.length > 100) validationErrors.name = 'Notebook name can not be over 100 characters'
      if (about.length > 400) validationErrors.about = 'Notebook about section can not be over 400 characters'
      setErrors(validationErrors)
    }, [name, about]);

    useEffect(() => {
      if (about === '') setAbout(' ')
    }, [about])

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (Object.values(errors).length) return;


      const serverResponse = await dispatch(thunkCreateNotebook({
          userId: user.id,
          name,
          about,
        })
      );

      if (serverResponse.name) {
        setErrors(serverResponse);
      } else {
        setName('')
        setAbout('')
        closeModal();
        navigate('/')
      }
    };

  return (
    <>
      <h1>New Notebook</h1>
      <form onSubmit={handleSubmit}>
        <div>
            <label>
            What would you like to name your new notebook?
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            </label>
            {errors.name ? <p className="error-validation">{errors.name}</p> : <p>{`${name.length}/100`}</p>}
        </div>
        <div>
            <div>Write a little about what you will use this notebook for!</div>
            <div>This is not required but it is a helpful way to keep your writing organized.</div>
            <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                required
            />
            {errors.about ? <p className="error-validation">{errors.about}</p> : <p>{`${about.length}/400`}</p>}
        </div>

        <button type="submit">Create New Notebook</button>
      </form>
    </>
  );
}

export default NewNotebookFormModal;
