import { Link } from "react-router";

export default function UserCard({user }) {
  return (
    <div
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
          <Link to={`users/${user.id}`} className="btn btn-primary btn-sm normal-case">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
