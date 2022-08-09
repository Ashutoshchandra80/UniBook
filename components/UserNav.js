import React, { useState } from "react";
import Image from "next/image";
import NewPost from "./NewPost";

import Router from "next/router";

export default function UserNav({ pic, logout }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <>
      <div className="px-2 sm:px-6 lg:px-8 gradient-bg-welcome">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center text-2xl text-white font-bold">
              <a className="text-2xl font-bold" href="/newsfeed" target="_self">
                Unibook
              </a>
            </div>
            <div className="flex m-auto">
              <div className="flex items-center justify-center ">
                <div className="flex border-2 border-gray-200 rounded">
                  <input type="text" className="px-3 py-1" placeholder="Search..." />
                  <button className="px-4 text-white bg-gray-600 border-l">Search</button>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <NewPost show={show} handleClose={handleClose} />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full m-5" onClick={handleLogout}>
              Logout
            </button>
            <a href="/user_dash" target="_self">
              <button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <Image className="h-8 w-8 rounded-full" width={32} height={32} src={pic} alt="" />
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
