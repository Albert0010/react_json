import React from "react";
import { useNavigate } from "react-router";

const Posts = ({ data }) => {
  const navigate = useNavigate();


  return (
    <>
      <div className="wrapper">
        {data.length
          ? data.map((elem) => (
              <div
                className="post"
                key={elem.id}
                style={{
                  border: "1px solid black",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div>
                  <div>
                    <p>{elem.title}</p>
                    <p>{elem.body}</p>
                  </div>

                  <button
                    style={{
                      height: "50px",
                      width: "50px",
                      marginLeft: "20px",
                    }}
                    onClick={() => navigate(`/post/${elem.id}`)}
                  >
                    Visit
                  </button>
                </div>
              </div>
            ))
          : null}
      </div>
    </>
  );
};

export default Posts;