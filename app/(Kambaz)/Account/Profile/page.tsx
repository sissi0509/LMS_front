"use client";
import { redirect } from "next/dist/client/components/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";
import type { User } from "../type";
import * as client from "../client";
export default function Profile() {
  const [profile, setProfile] = useState<User | null>(null);
  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
  };

  const fetchProfile = () => {
    if (!currentUser) return redirect("/Account/Signin");
    setProfile(currentUser);
  };
  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    redirect("/Account/Signin");
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div id="wd-profile-screen">
      <h1>Profile</h1>
      {profile && (
        <div>
          <input
            value={profile.username}
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
            placeholder="username"
            id="wd-username"
            className="form-control mb-2"
          />

          <input
            value={profile.password}
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
            placeholder="password"
            type="password"
            id="wd-password"
            className="form-control mb-2"
          />

          <input
            value={profile.firstName}
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
            placeholder="First Name"
            id="wd-firstname"
            className="form-control mb-2"
          />

          <input
            value={profile.lastName}
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
            placeholder="Last Name"
            id="wd-lastname"
            className="form-control mb-2"
          />

          <input
            value={profile.dob?.split("T")[0]}
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            type="date"
            id="wd-dob"
            className="form-control mb-2"
          />

          <input
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            placeholder="Email"
            type="email"
            id="wd-email"
            className="form-control mb-2"
          />

          <select
            className="form-control mb-2"
            value={profile.role}
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            id="wd-role"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          <button
            onClick={updateProfile}
            className="btn btn-primary w-100 mb-2"
          >
            Update
          </button>

          <button onClick={signout} className="btn btn-danger w-100 mb-2">
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
