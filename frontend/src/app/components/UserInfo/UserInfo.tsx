"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

type UserInfoProps = {
  attribute: string;
};

const UserInfo: React.FC<UserInfoProps> = ({ attribute }) => {
  const [data, setData] = useState("");

  useEffect(() => {
    const token = Cookies.get("jwt");
    if (token) {
      const decoded = jwtDecode<{ [key: string]: any }>(token);
      if (decoded && decoded[attribute]) {
        setData(decoded[attribute]);
      }
    }
  }, [attribute]);

  if (!data) {
    return null;
  }

  return <p>{data}</p>;
};

export default UserInfo;
