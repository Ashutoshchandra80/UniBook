import React, { useState } from "react";
import { GrLogin } from "react-icons/gr";
import axios from "axios";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { getSession } from "../redux/actions/sessionActions";
// eslint-disable-next-line react/display-name
const Login = ({ setIsLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const session = useSelector((state) => state);
  const user = session.data.login;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      email,
      password,
    };
    if (!email || !email.match("^[A-Za-z0-9._%+-]+@mnnit.ac.in$")) {
      alert("Please enter a valid email address!");
      return;
    }

    console.log(data);
    savePost(data);

    setEmail("");
    setPassword("");
  };

  const savePost = async (data) => {
    await axios
      .post("http://localhost:9000/login/", data, {
        headers: {
          accept: "applications/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
      })
      .then((res) => {
        console.log(res.data);
        dispatch(getSession(res.data));
        Router.push({
          pathname: "/newsfeed",
        });
      })
      .catch((err) => {
        alert("Invalid Credentials!");
      });
  };

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <GrLogin className="m-auto text-4xl" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log in to your account</h2>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email-address"
                  type="email-address"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="grid grid-cols-2">
              <button
                type="submit"
                onClick={(e) => handleSubmit(e)}
                className="group relative flex justify-center py-2 px-4 mr-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Log in
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Not an user? Register here
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
