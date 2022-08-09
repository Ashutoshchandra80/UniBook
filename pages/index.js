import Head from "next/head";
import Image from "next/image";
import Login from "../components/Login";
import Signup from "../components/Signup";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { delSession } from "../redux/actions/sessionActions";
import Router from "next/router";
const NavbarItem = ({ title, classProps, link }) => {
  return (
    <a href={link} className={`mx-2 cursor-pointer btn-grad transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-300 ${classProps} p-1`}>
      <btn>{title}</btn>
    </a>
  );
};

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const session = useSelector((state) => state);

  const dispatch = useDispatch();
  const data = session.data.login;
  console.log(data);
  if (data) {
    Router.push("/newsfeed");
    return <h4>Redirecting to home page.</h4>;
  }
  return (
    <div className="grid grid-rows-1">
      <Navbar />
      <div className="flex grid grid-cols-5 gap-4">
        <div className="ml-5 col-span-2">
          <Image src="/images/home.jpg" width="100%" height="100%" layout="responsive" objectFit="contain" alt="logo" className="cursor-pointer rounded-lg" />
        </div>
        <div className="col-span-3 gap-x-10">
          {isLogin && <Login setIsLogin={setIsLogin} />}
          {!isLogin && <Signup setIsLogin={setIsLogin} />}
        </div>
      </div>
    </div>
  );
}
