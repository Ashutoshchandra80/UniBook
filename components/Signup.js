import React, { useState } from "react";
import { GiArchiveRegister } from "react-icons/gi";
import FileBase64 from "react-file-base64";
import axios from "axios";
import Router from "next/router";

const Signup = ({ setIsLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [regno, setRegno] = useState("");
  const [branch, setBranch] = useState("");
  const [idcard, setIdcard] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      name: name,
      email: email,
      registration: regno,
      branch: branch,
      idCard: idcard,
    };
    if (!email || !email.match("^[A-Za-z0-9._%+-]+@mnnit.ac.in$")) {
      alert("Please enter a valid email address!");
      return;
    }

    console.log(data);
    savePost(data);

    setName("");
    setEmail("");
    setRegno("");
    setBranch("");
    setIdcard("");
  };

  const savePost = async (data) => {
    await axios
      .post("http://localhost:9000/signup/", data, {
        headers: {
          accept: "applications/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
      })
      .then((res) => {
        console.log(res);
        alert("Signup completed, go to email to see your password and login");
        Router.push("/");
      })
      .catch((err) => {
        alert("Signup failed, try again!");
      });
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full">
        <div className="md:grid md:grid-cols-3 md:gap-3">
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div>
              <GiArchiveRegister className="m-auto mt-5 text-4xl" />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Welcome, please Register</h2>
            </div>
            <form action="#" method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email-address"
                        id="email-address"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="reg_no" className="block text-sm font-medium text-gray-700">
                        Registration Number
                      </label>
                      <input
                        type="number"
                        name="reg_no"
                        id="reg_no"
                        autoCorrect="reg_no"
                        value={regno}
                        onChange={(e) => setRegno(e.target.value)}
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="branch" className="block text-sm font-medium text-gray-700">
                        Branch
                      </label>
                      <input
                        type="text"
                        name="branch"
                        id="branch"
                        autoComplete="branch"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="idcard" className="block text-sm font-medium text-gray-700">
                        ID card image
                      </label>
                      <FileBase64
                        type="file"
                        name="idcard"
                        id="idcard"
                        autoComplete="idcard"
                        className="block w-full text-sm text-slate-500
                                  file:mr-4 file:py-2 file:px-4
                                  file:rounded-full file:border-0
                                  file:text-sm file:font-semibold
                                  file:bg-violet-50 file:text-violet-700
                                  hover:file:bg-violet-100
                                  "
                        multiple={false}
                        onDone={({ base64 }) => setIdcard(base64)}
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                    className="mr-5 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Register
                  </button>
                  <button
                    type="submit"
                    onClick={() => setIsLogin(true)}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Already registered, Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
