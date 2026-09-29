import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("All companies");
  const apiUrl = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [apiUrl]);

  const handleCompanyChange = (company) => {
    setSelectedCompany(company);
  };

  const filteredUsers = users.filter((user) => {
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

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full mb-5">
        <div className="flex-1">
          <label className="input input-bordered flex items-center gap-2 w-full">
            <svg
              className="h-[1em] opacity-50 shrink-0"
              xmlns="http://w3.org"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              required
              placeholder="Search..."
              className="grow"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        </div>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-outline flex items-center justify-between min-w-[12rem] w-full sm:w-auto gap-2"
          >
            <span className="truncate">{selectedCompany}</span>
            <svg
              xmlns="http://w3.org"
              className="h-4 w-4 opacity-60 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[10] w-52 p-2 shadow-lg mt-1 border border-base-200"
          >
            {users.map((user) => (
              <li key={user.id}>
                <button
                  type="button"
                  onClick={() => handleCompanyChange(user.company.name)}
                  className={
                    selectedCompany === user.company.name ? "active" : ""
                  }
                >
                  {user.company.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="card glass shadow-md hover:scale-[1.01] transition-transform"
          >
            <div className="card-body p-5">
              <div className="flex items-start justify-between gap-2">
                <h2 className="card-title text-lg font-bold">{user.name}</h2>
                <span className="badge badge-neutral text-xs font-medium truncate max-w-[120px]">
                  {user.company.name}
                </span>
              </div>

              <div className="space-y-1.5 mt-2 text-xs opacity-80">
                <div className="flex items-center gap-2">
                  <span className="font-semibold w-16">📧 Email:</span>
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold w-16">📞 Phone:</span>
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold w-16">🏙️ City:</span>
                  <span>{user.address.city}</span>
                </div>
              </div>

              <div className="card-actions justify-end border-t border-base-content/10 pt-3 mt-3">
                <button className="btn btn-primary btn-sm normal-case">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredUsers.length === 0 && (
        <div role="alert" className="alert alert-warning alert-outline">
          <span>User is not found!</span>
        </div>
      )}
    </div>
  );
}

export default App;
