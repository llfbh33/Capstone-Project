import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./NewNotebookModal.css";
import { useNavigate } from "react-router-dom";
import { thunkCreateNotebook } from "../../redux/notebook";

function NewNotebookFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.session.user)
  const [name, setName] = useState('');
  const [about, setAbout] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {

  }, [name, about])

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      navigate('/home')
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
            {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
            <label>
            Write a little about what you will use this notebook for
            <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                required
            />
            </label>
            {errors.about && <p>{errors.about}</p>}
        </div>

        <button type="submit">Create New Notebook</button>
      </form>
    </>
  );
}

export default NewNotebookFormModal;
