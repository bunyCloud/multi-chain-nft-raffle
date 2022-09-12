import { useMoralis } from "react-moralis";
import Logo from "../bunyG.png";
import { useState } from "react";
import {Button} from 'antd';
import  Account from './Account';
import AvaxLogin from './AvaxLogin';

export default function SignIn() {
  const { authenticate, authError, isAuthenticating } = useMoralis();

  const [email, setEmail] = useState("");

  //Magic Authentication

  return (
    <div className="signInCard">
      <img alt="logo" className="img" src={Logo} width={300} height={200} />
      {isAuthenticating && <p className="green">Authenticating</p>}
      {authError && (
        <p style={{color:'gold'}}>{JSON.stringify(authError.message)}</p>
      )}
      <div className="buttonCard">
<AvaxLogin />
        <Account />

      </div>
    </div>
  );
}
