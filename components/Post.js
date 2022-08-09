import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { AiOutlineLike } from "react-icons/ai";

const Post = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      await axios
        .get("http://localhost:9000/post", {
          headers: {
            accept: "applications/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Access-Control-Allow-Origin": "http://localhost:3000",
          },
        })
        .then((res) => {
          console.log(res.data);
          setPosts(res.data);
        });
    };
    fetchPosts();
  }, [posts]);

  const updateLike = async (id) => {
    await axios
      .get(`http://localhost:9000/post/like/${id}`, {
        headers: {
          accept: "applications/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
      })
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      });
  }

  return (
    <>
      <div className="mt-6">
        {posts.map((post, e) => (
          <div key={e} className="p-10 border-black border-2 my-5">
            <p className="text-3xl font-bold" rel="noreferrer">
              {post.title} <span className="text-sm font-normal"> posted this </span>
            </p>
            <p className="mt-6 flex justify-between font-semibold text-gradient my-5 underline">
              <div className="w-full h-full bg-white rounded-lg sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                <img src={post.photo} alt={post.title} className="w-full cursor-pointer hover:opacity-75 h-full hover:scale-120" />
              </div>
            </p>
            <p className="text-black">{post.description}</p>
            <div className="py-3">
              <div className="flex justify-between items-center">
                <p onClick={() => updateLike(post._id)} className="flex items-center text-black border hover: cursor-pointer rounded-lg p-2 hover:-translate-y-1 hover:scale-105 hover:bg-[#FB9039] duration-300">
                  <AiOutlineLike size="1.5em" color={"action"} className="mr-2" />
                  {post.like}
                  <span className="ml-1">Like</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Post;
