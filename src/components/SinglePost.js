import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import '../App.css'

const SinglePost = ({ setData }) => {
  const [singlePost, setSinglePost] = useState({});
  const [comment, setComment] = useState({});
  const [editFlag, setEditFlag] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
      .then((response) => response.json())
      .then((json) => {
        setTitleInput(json.title);
        setSinglePost(json);
      });
    fetch(`https://jsonplaceholder.typicode.com/comments/${params.id}`)
      .then((response) => response.json())
      .then((json) => {
        setNameInput(json.name);
        setComment(json);
      });
  }, []);

  const handleDelete = (id) => () => {
    setData((prevState) => prevState.filter((elem) => elem.id !== id));
    navigate("/");
    alert("deleted");
  };

  const handleEdit = () => {
    setEditFlag(true);
  };

  const handleSubmit = (id) => {
    setData((prevState) =>
      prevState.map((elem) => {
        if (elem.id === id) {
          elem.title = titleInput;
        }
        return elem;
      })
    );
    setComment({ ...comment, name: nameInput });
    setEditFlag(false);
    setSinglePost({ ...singlePost, title: titleInput });
  };

  const handleCancel = () => {
    setEditFlag(false);
    setTitleInput(singlePost?.title);
    setNameInput(comment?.name);
  };
  return (
    <div className='single_post'>
      <h1>Post info</h1>
      <div>
        <p>title ==> {singlePost?.title}</p>
        <p>post id ==> {singlePost?.id}</p>
      </div>
      <h1>Comment info</h1>
      <p>name ==> {comment?.name}</p>
      <p>email ==> {comment?.email}</p>

      {editFlag ? (
        <div>
          <>
              <p> For name</p>
              <input
                  onChange={(e) => setNameInput(e.target.value)}
                  type="text"
                  value={nameInput}
              />

          </>
         <>
             <p> For title</p>
             <input
                 onChange={(e) => setTitleInput(e.target.value)}
                 type="text"
                 value={titleInput}
             />
         </>
        </div>
      ) : null}
      {!editFlag ? (
        <div>
          <button onClick={() => navigate("/")}>Go Back</button>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete(singlePost?.id)}>Delete</button>
        </div>
      ) : (
        <div>
          <button onClick={() => handleSubmit(singlePost?.id)}>Submit</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default SinglePost;