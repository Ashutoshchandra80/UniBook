import UserNav from "../../components/UserNav";
import React from "react";
import Editdetails from "../../components/Editdetails";
import { useSelector, useDispatch } from "react-redux";
import { delSession } from "../../redux/actions/sessionActions";
import Router from "next/router";

const EditProfile = () => {
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
      <Editdetails data={data} />
    </>
  );
};

export default EditProfile;
