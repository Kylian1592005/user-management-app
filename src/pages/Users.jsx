import { useEffect, useState } from "react";
import Search from "../components/Search";
import UserList from "../components/UserList";
import { useLocation, useNavigate } from "react-router";
import Pagination from "../components/Pagination";

function Users({ usersLists, loading, error }) {
  const [search, setSearch] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("All companies");
  const location = useLocation();
  const navigate = useNavigate();
  const deleteInfo = location.state?.message;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (deleteInfo) {
      const timer = setTimeout(() => {
        navigate("/", {
          state: null,
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  });

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

  const usersPerPage = 6;
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage,
  );
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

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
      {deleteInfo && (
        <div role="alert" className="alert alert-success mb-6">
          <span>{deleteInfo}</span>
        </div>
      )}
      <div className="text-center mb-2">
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
        usersLists={usersLists}
      />

      <UserList currentUsers={currentUsers} />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Users;
