import React from "react";
import { useState } from "react";
import axios from "axios";
import Router from "next/router";
import UserNav from "./UserNav";

const Feed = ({ id }) => {
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios
        .post("http://localhost:9000/user/" + id, data, {
          headers: {
            accept: "applications/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Access-Control-Allow-Origin": "http://localhost:3000",
          },
        })
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        });
    };
    fetchData();
  });

  return (
    <div>
      <UserNav />
    </div>
  );
};

export default Feed;
