import { Link } from "react-router-dom";

export default function Search({
  search,
  setSearch,
  selectedCompany,
  onCompanyChange,
  usersLists,
}) {
  return (
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
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </label>
      </div>

      <div>
        <Link to="users/new" className="btn btn-primary">
          Add User
        </Link>
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
          {usersLists.map((user) => (
            <li key={user.id}>
              <button
                type="button"
                onClick={() => onCompanyChange(user.company.name)}
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
  );
}
