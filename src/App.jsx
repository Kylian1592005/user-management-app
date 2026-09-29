import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
      <h1 className="text-4xl font-bold mb-6">Users List</h1>
      <label className="input mb-5">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
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
        <input type="search" required placeholder="Search" />
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
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
    </div>
  );
}

export default App;
