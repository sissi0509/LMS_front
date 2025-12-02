"use client";
import Link from "next/link";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl } from "react-bootstrap";
import * as client from "../client";
import { useRouter } from "next/navigation";

type Credentials = {
  username: string;
  password: string;
};

export default function Signin() {
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const router = useRouter();

  const signin = async () => {
    try {
      const user = await client.signin(credentials);
      dispatch(setCurrentUser(user));
      router.push("/Dashboard");
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <FormControl
        defaultValue={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
        placeholder="username"
        id="wd-username"
        className="mb-2"
      />

      <FormControl
        defaultValue={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        placeholder="password"
        type="password"
        id="wd-password"
        className="mb-2"
      />

      <button
        onClick={signin}
        id="wd-signin-btn"
        className="btn btn-primary w-100 mb-2"
      >
        Sign in
      </button>
      <br />
      <Link href="Signup" id="wd-signup-link">
        Sign up
      </Link>
    </div>
  );
}
