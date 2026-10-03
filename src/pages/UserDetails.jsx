import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import EditForm from "../components/EditForm";
import UserInfo from "../components/UserInfo";

export default function UserDetails({
  usersLists,
  setUsersLists,
  loading,
  error,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const user = usersLists.find((user) => user.id === Number(id));

  const [formData, setFormData] = useState({
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
    website: user?.website || "",
    address: {
      street: user?.address?.street || "",
      suite: user?.address?.suite || "",
      city: user?.address?.city || "",
      zipcode: user?.address?.zipcode || "",
    },
    company: {
      name: user?.company?.name || "",
      catchPhrase: user?.company?.catchPhrase || "",
    },
  });

  const handleInputChange = (id, value) => {
    if (id.includes(".")) {
      const [parent, child] = id.split(".");

      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    try {
      setUsersLists((prev) =>
        prev.map((target) =>
          target.id === user.id ? { ...formData, id: target.id } : target,
        ),
      );
      setIsEditing(false);
    } catch (err) {
      console.error("Save Error:", err);
      alert(err.message || "An error occurred while saving");
    }
  };

  const handleDeleteUser = (id) => {
    const targetUser = usersLists.filter((user) => user.id !== id);
    setUsersLists(targetUser);
    navigate("/", {
      state: {
        message: "User deleted successfully.",
      },
    });
  };

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
        onClick={() => {
          if (isEditing) {
            setIsEditing(false);
          } else {
            navigate("/");
          }
        }}
        className="btn btn-ghost btn-sm gap-2 mb-4 normal-case text-base-content/70 hover:text-base-content"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
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

      {user ? (
        <div className="card bg-base-100 border border-base-200 shadow-xl transition-all duration-300 hover:shadow-2xl">
          <div className="card-body p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
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
                  <p className="text-sm text-base-content/60">
                    @{user.username}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="btn btn-error btn-outline btn-sm gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                  Delete
                </button>

                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn btn-primary btn-outline btn-sm gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                    Edit
                  </button>
                )}
              </div>
            </div>

            <div className="divider my-1"></div>

            {isEditing ? (
              <EditForm
                setIsEditing={setIsEditing}
                formData={formData}
                onInputChange={handleInputChange}
                onSaveData={handleSaveUser}
              />
            ) : (
              <UserInfo user={user} />
            )}
          </div>
        </div>
      ) : (
        <div>User is not found</div>
      )}
    </div>
  );
}
