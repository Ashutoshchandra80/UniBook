import Feed from "../components/Feed";
import React from "react";
import UserNav from "../components/UserNav";
import { useSelector, useDispatch } from "react-redux";
import { delSession } from "../redux/actions/sessionActions";
import Router from "next/router";
import Post from "../components/Post";

const NewsFeed = (props) => {
  const session = useSelector((state) => state);

  const dispatch = useDispatch();
  const data = session.data.login;
  const logout = () => {
    console.log("logout");
    dispatch(delSession());
    Router.push("/");
    return <h4>logging you out...</h4>;
  };
  if (!data) {
    Router.push("/");
    return <h4>Redirecting to home page.</h4>;
  }
  return (
    <div>
      <UserNav pic={data.idCard} logout={logout} />
      <div className="container">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-2 col-start-2">
            <Post />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
