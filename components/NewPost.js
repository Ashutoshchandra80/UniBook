import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Router from "next/router";

const NewPost = (props) => {
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState("");
  const [desc, setDesc] = useState("");
  const [showModal, setShowModal] = React.useState(false);

  const session = useSelector((state) => state);

  const dispatch = useDispatch();
  const data = session.data.login;

  const savePost = async (e) => {
    setShowModal(false);
    const postData = {
      title: data.name,
      photo: cover,
      description: desc,
    };
    console.log(postData);
    save(postData);
    setCover("");
    setDesc("");
    setTitle("");
  };

  const save = async (postData) => {
    await axios
      .post("http://localhost:9000/post", postData, {
        headers: {
          accept: "applications/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
      })
      .then((res) => {
        console.log(res.data);
        Router.push("/newsfeed");
      });
  };

  return (
    <>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full m-5" type="button" onClick={() => setShowModal(true)}>
        Create Post
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold">Create new post</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                  </button>
                </div>
                {/*body*/}
                <form className="mt-8 space-y-6" action="#" method="POST">
                  <input type="hidden" name="remember" defaultValue="true" />
                  <div className="rounded-md shadow-sm -space-y-px">
                    <div className="m-5">
                      <label htmlFor="cover" className="block text-sm font-medium text-gray-700">
                        Cover
                      </label>
                      <FileBase64 type="file" id="cover" name="cover" multiple={false} onDone={({ base64 }) => setCover(base64)} />
                    </div>
                  </div>
                  <div className="m-5">
                    <label htmlFor="desc" className="block text-sm font-medium text-gray-700">
                      Add description
                    </label>
                    <input
                      id="desc"
                      name="desc"
                      type="textarea"
                      autoComplete="desc"
                      required
                      onChange={(e) => setDesc(e.target.value)}
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Add description"
                    />
                  </div>

                  <div className="grid grid-cols-2">
                    <button
                      className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={(e) => savePost()}
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default NewPost;
