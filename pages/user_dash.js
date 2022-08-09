import UserNav from "../components/UserNav";
import React from "react";
import UserCard from "../components/userCard";
import { useSelector, useDispatch } from "react-redux";
import { delSession } from "../redux/actions/sessionActions";
import Router from "next/router";
import Post from "../components/Post";

const User_dash = () => {
  const session = useSelector((state) => state);

  const dispatch = useDispatch();
  const data = session.data.login;
  console.log(data);
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
    <>
      <UserNav pic={data.idCard} logout={logout} />
      <UserCard data={data} />
    </>
  );
};

export default User_dash;
