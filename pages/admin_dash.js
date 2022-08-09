import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { AiOutlineLike } from "react-icons/ai";
import Image from "next/image";
import Router from "next/router";

const Admin_dash = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      await axios
        .get("http://localhost:9000/user", {
          headers: {
            accept: "applications/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Access-Control-Allow-Origin": "http://localhost:3000",
          },
        })
        .then((res) => {
          console.log(res.data);
          setUsers(res.data);
        });
    };
    fetchUsers();
  }, []);
  const handleVerify = async (regsitration) => {
    await axios
      .get("http://localhost:9000/user/verify/" + regsitration, {
        headers: {
          accept: "applications/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
      })
      .then((res) => {
        console.log(res.data);
        Router.push("/admin_dash");
      });
  };
  return (
    <div className="container mx-5">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Reg. No.
              </th>
              <th scope="col" className="px-6 py-3">
                Id Card
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">verify</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              // eslint-disable-next-line react/jsx-key
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  {user.name}
                </th>
                <td className="px-6 py-4">{user.registration}</td>
                <td className="px-6 py-4">
                  <Image src={user.idCard} width={300} height={100} />
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleVerify(user.registration)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Verify
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin_dash;
