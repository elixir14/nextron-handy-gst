import React, { useRef, useState, useEffect } from "react";
import Head from "next/head";
import prisma from "../../lib/prisma";

const home = (props) => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const [allUsers, setallUsers] = useState([]);

  useEffect(() => {
    setallUsers(JSON.parse(props.users));
  }, [props.users]);

  const saveUser = async () => {
    const user = {
      name: nameRef?.current?.value,
      email: emailRef?.current?.value,
    };
    const res = await fetch("api/create-user", {
      method: "POST",
      body: JSON.stringify(user),
    });
  };

  return (
    <div>
      <Head>
        <title>Handy GST</title>
      </Head>
      <div style={{ display: "flex" }}>
        <div>
          <div>
            Name : <input ref={nameRef} />
          </div>
          <div style={{ marginTop: "1rem" }}>
            Email : <input ref={emailRef} />
          </div>
          <button onClick={saveUser} style={{ marginTop: "1rem" }}>
            Submit
          </button>
        </div>
        <div style={{ width: "100%", margin: "0 3rem" }}>
          <table border="1">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>CreatedAt</th>
              </tr>
            </thead>
            <tbody>
              {allUsers?.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const users = await prisma.user.findMany();

  return {
    props: { users: JSON.stringify(users) },
  };
};

export default home;
