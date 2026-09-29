import UserCard from "./UserCard";

export default function UserList({ filteredUsers }) {
  return (
    <div className="w-full">
      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
           <UserCard user={user} />
          ))}
        </div>
      ) : (
        <div
          role="alert"
          className="alert alert-warning alert-outline flex items-center justify-center p-8 bg-base-100/50 backdrop-blur"
        >
          <svg
            xmlns="http://w3.org"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span className="font-medium text-sm">
            No users found matching your filter criteria.
          </span>
        </div>
      )}
    </div>
  );
}
