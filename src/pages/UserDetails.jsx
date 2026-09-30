import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { apiUrl } from "../data/data";

export default function UserDetails() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`${apiUrl}/${id}`);
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [id]);

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
    <div className="max-w-xl mx-auto p-4">
      <button
        className="glass btn btn-ghost btn-sm gap-2 mb-4 normal-case text-base-content/70 hover:text-base-content"
        onClick={() => navigate(-1)}
      >
        <svg
          xmlns="http://w3.org"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        Back to Users
      </button>

      <div className="card glass bg-base-100 border border-base-200 shadow-xl transition-all duration-300 hover:shadow-2xl">
        <div className="card-body p-6 sm:p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content rounded-full w-14 h-14 ring ring-primary ring-offset-base-100 ring-offset-2 flex items-center justify-center">
                <span className="text-xl font-bold uppercase">
                  {user.name?.charAt(0)}
                </span>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-base-content">
                {user.name}
              </h1>
              <p className="text-sm text-base-content/60">@{user.username}</p>
            </div>
          </div>

          <div className="divider my-1"></div>

          <div className="space-y-6 mt-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-primary mb-3">
                Contact Information
              </h2>
              <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2.5 text-sm align-middle">
                <div className="flex items-center text-base-content/50">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <span className="break-all font-medium">{user.email}</span>

                <div className="flex items-center text-base-content/50">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-1.514 2.02a11.842 11.842 0 01-5.017-5.017l2.02-1.514c.361-.272.528-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.75z"
                    />
                  </svg>
                </div>
                <span>{user.phone}</span>

                <div className="flex items-center text-base-content/50">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253"
                    />
                  </svg>
                </div>
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="link link-primary link-hover"
                >
                  {user.website}
                </a>
              </div>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-primary mb-3">
                Address
              </h2>
              <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2.5 text-sm">
                <div className="flex items-start mt-0.5 text-base-content/50">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </div>
                <div className="text-base-content/90 leading-relaxed">
                  {user.address?.suite}, {user.address?.street}
                  <br />
                  {user.address?.city}, {user.address?.zipcode}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-primary mb-3">
                Company
              </h2>
              <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
                <div className="flex items-center text-base-content/50">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h18v3H3V3z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="font-semibold block text-base-content">
                    {user.company?.name}
                  </span>
                  <span className="italic text-xs text-base-content/60 mt-0.5 block">
                    "{user.company?.catchPhrase}"
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
