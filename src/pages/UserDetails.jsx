import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { apiUrl } from "../data/data";
import EditForm from "../components/EditForm";
import UserInfo from "../components/UserInfo";

export default function UserDetails() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    address: { street: "", suite: "", city: "", zipcode: "" },
    company: { name: "", catchPhrase: "" },
  });

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`${apiUrl}/${id}`);
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();
        setUser(data);
        setFormData({
          name: data.name || "",
          username: data.username || "",
          email: data.email || "",
          phone: data.phone || "",
          website: data.website || "",
          address: {
            street: data.address?.street || "",
            suite: data.address?.suite || "",
            city: data.address?.city || "",
            zipcode: data.address?.zipcode || "",
          },
          company: {
            name: data.company?.name || "",
            catchPhrase: data.company?.catchPhrase || "",
          },
        });
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [id]);

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

  const handleSaveData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user details");
      }
      const updatedData = await response.json();
      setUser(updatedData);
      setIsEditing(false);
    } catch (err) {
      console.error("Save Error:", err);
      alert(err.message || "An error occurred while saving");
    }
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
          if(isEditing) {
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
                <p className="text-sm text-base-content/60">@{user.username}</p>
              </div>
            </div>

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

          <div className="divider my-1"></div>

          {isEditing ? (
            <EditForm
              setIsEditing={setIsEditing}
              formData={formData}
              onInputChange={handleInputChange}
              onSaveData={handleSaveData}
            />
          ) : (
            <UserInfo user={user} />
          )}
        </div>
      </div>
    </div>
  );
}
