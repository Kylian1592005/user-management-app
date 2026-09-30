import { useEffect, useState } from "react";
import "./Users.css";
import Search from "../components/Search";
import UserList from "../components/UserList";
import { apiUrl } from "../data/data";

function Users() {
  const [usersLists, setUsersLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("All companies");

  useEffect(() => {
    async function fetchUsers() {
      try {
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

  const handleCompanyChange = (company) => {
    setSelectedCompany(company);
  };

  const filteredUsers = usersLists.filter((user) => {
    const matchUser = user.name.toLowerCase().includes(search.toLowerCase());

    const matchCompany =
      selectedCompany === "All companies" ||
      user.company.name.includes(selectedCompany);

    return matchUser && matchCompany;
  });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-5">
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-5">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-base-content mb-2">
          User Management
        </h1>
        <p className="text-sm text-base-content/60 max-w-md mx-auto">
          Manage and view all users from a single dashboard.
        </p>
      </div>

      <Search
        search={search}
        setSearch={setSearch}
        selectedCompany={selectedCompany}
        onCompanyChange={handleCompanyChange}
        users={usersLists}
      />

      <UserList filteredUsers={filteredUsers} />
    </div>
  );
}

export default Users;
