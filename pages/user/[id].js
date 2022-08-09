import UserNav from '@components/UserNav'
import React from 'react'
import  UserCard from '@components/userCard'
import { useEffect } from "react";
import * as axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import useSWR from 'swr'

function Home() {
    const [data, setData] = useState({});
    const router = useRouter();
  const id = router.query.id;
  console.log(id);
  const URL = `http://localhost:9000/signup/${id}`;
  useEffect(() => {
    // if (!router.isReady) return;
    // console.log(router.query.id);

    axios.get(`http://localhost:9000/signup/${id}`).then((response) => {
      console.log(response);
      setData(response);
      console.log(data);
    });
  }, [router.isReady]);

  const { Data, error } = useSWR(`http://localhost:9000/signup/${id}`)
  console.log(Data);
  return (
    <>
    <UserNav/>
    <UserCard />
    </>  
  )
}

export default Home