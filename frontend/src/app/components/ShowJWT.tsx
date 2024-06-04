// components/ShowJWT.js
import React from 'react';
import cookies from 'next-cookies';

const ShowJWT = ({ jwt }) => {
  return (
    <div>
      <h1>JWT Content</h1>
      <pre>{JSON.stringify(jwt, null, 2)}</pre>
    </div>
  );
};

export async function getServerSideProps(context) {
  const allCookies = cookies(context);
  const jwt = allCookies.JWT ? JSON.parse(allCookies.JWT) : null;

  return {
    props: { jwt },
  };
}

export default ShowJWT;
