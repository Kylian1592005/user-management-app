import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import Users from "../pages/Users";
import UserDetails from "../pages/UserDetails";
import NewUserForm from "../pages/NewUserForm";
import { apiUrl } from "../data/data";

export default function Router() {
  const [usersLists, setUsersLists] = useState(() => {
    const storedData = localStorage.getItem("users");
    return storedData ? JSON.parse(storedData) : [];
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("users");

    if (storedData) {
      return;
    }

    async function fetchUsers() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUsersLists(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(usersLists));
  }, [usersLists]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Users
            usersLists={usersLists}
            setUsersLists={setUsersLists}
            loading={loading}
            error={error}
          />
        }
      />
      <Route
        path="users/:id"
        element={
          <UserDetails
            usersLists={usersLists}
            setUsersLists={setUsersLists}
            loading={loading}
            error={error}
          />
        }
      />
      <Route
        path="users/new"
        element={
          <NewUserForm usersLists={usersLists} setUsersLists={setUsersLists} />
        }
      />
    </Routes>
  );
}
