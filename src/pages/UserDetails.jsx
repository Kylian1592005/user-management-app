import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { apiUrl } from "../data/data";

export default function UserDetails() {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(`${apiUrl}/${id}`);
      const data = await response.json();
      setUser(data);
    }
    fetchUser();
  });
  return <div>{user.name}</div>;
}
