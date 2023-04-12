import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import Posts from "./components/Post.js";
import SinglePost from "./components/SinglePost";

const App = () => {
  const [data, setData] = useState([]);
  const [isCreate, setCreate] = useState(false);
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  const handleCreate = () => {
    setCreate(true);

  };

  const handleSubmit = ()=>{
    setData((prevState) => [
      ...prevState,
      {
        id: Math.random(),
        userId: Math.random(),
        title,
        body
      },
    ]);
    setCreate(false);
  }


  return (
    <div>
      {!isCreate ? (
        <>
          <button onClick={() => handleCreate()}>create</button>

          <Routes>
            <Route path="/" element={<Posts data={data} />} />
            <Route
              path="/post/:id"
              element={<SinglePost setData={setData} />}
            />
          </Routes>
        </>
      ) : (
        <>
          <>
            <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="write title" />
            <input value={body} onChange={(e)=>setBody(e.target.value)} placeholder="write body" />
            <button disabled={!title.trim() || !body.trim()} onClick={handleSubmit}>submit</button>
            <button onClick={()=>{
              setBody('')
              setTitle('');
              setCreate(false)
            }}>cancel</button>
          </>
        </>
      )}
    </div>
  );
};

export default App;
