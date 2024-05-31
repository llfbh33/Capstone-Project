import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";

import { useNavigate, useParams } from "react-router-dom";
import LeftNavigation from "../LeftNavigation/LeftNavigation";

import './EntryPage'

function EntryPage() {
const {notebookId, entryId} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const notebook = useSelector(state => state.notebooks[notebookId])
  const entry = useSelector(state => state.entries[entryId]);
  console.log(entry)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        username: userName,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
      navigate('/home')
    }
  };

  return (
    <div className='main-insite-container'>
        <div className='left-hand-nav-container'>
            <LeftNavigation />
        </div>
         <div className='main-insite-content-container'>
            <div>
                <h1>{`Notebook: ${notebook?.name}`}</h1>
                <h1>{`Entry: ${entry?.name}`}</h1>
            </div>
            <h1 id='homepage-underline'></h1>
            <div className="entry-content-container">
                <form onSubmit={handleSubmit}>
                <label>
            User Name
            <div className="entry-content-input-container">
                <textarea
                    className="entry-input-area"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
            </div>

            </label>
            {errors.username && <p>{errors.username}</p>}
            <label>
            Password
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </label>
            {errors.password && <p>{errors.password}</p>}
            <button type="submit">Log In</button>
        </form>
            </div>
      </div>
    </div>
  );
}

export default EntryPage;
