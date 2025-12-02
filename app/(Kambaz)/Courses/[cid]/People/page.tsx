"use client";

import { useEffect, useState } from "react";
import * as client from "../../client";
import PeopleTable from "./Table/page";
import { useParams } from "next/navigation";
// import PeopleTable from "./Table/page";
export default function People() {
  const [users, setUsers] = useState<any[]>([]);

  const { cid } = useParams() as { cid: string };

  const fetchUsers = async () => {
    if (!cid) return;
    const users = await client.findUsersForCourse(cid);
    setUsers(users);
  };
  useEffect(() => {
    fetchUsers();
  }, [cid]);

  return (
    <div>
      <h2>People</h2>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
