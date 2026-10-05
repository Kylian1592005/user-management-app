import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewUserForm({ usersLists, setUsersLists }) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
    },
    company: {
      name: "",
      catchPhrase: "",
    },
  });
  const [inputRequire, setInputRequire] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const navigate = useNavigate();
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const onInputChange = (id, value) => {
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

    if (id === "name") {
      setInputRequire(false);
    }

    if (id === "email") {
      setEmailValid(value === "" || validateEmail(value));
    }
  };

  const handleAddUser = (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail(formData.email);
    setEmailValid(isEmailValid);

    if (!isEmailValid) {
      return;
    }

    if (formData.name.trim() === "") {
      setInputRequire(true);
      return;
    }

    const lastUser = usersLists.reduce((maxUser, currentUser) => {
      return Number(currentUser.id) > Number(maxUser.id)
        ? currentUser
        : maxUser;
    }, usersLists[0]);

    const newUser = {
      id: lastUser ? Number(lastUser.id) + 1 : 1,
      ...formData,
    };
    setUsersLists((prev) => [...prev, newUser]);
    navigate("/");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <form onSubmit={handleAddUser} className="space-y-6">
        <div className="flex items-center justify-between border-b border-base-200 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-base-content">
              Create New User
            </h2>
            <p className="text-sm text-base-content/60 mt-1">
              Fill in the details below to add a new user to the system.
            </p>
          </div>
          <span className="badge badge-primary badge-outline font-semibold">
            New
          </span>
        </div>

        <div className="card bg-base-100 shadow-sm border border-base-200 p-5 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Personal Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                className={`input input-bordered w-full focus:input-primary transition-all ${
                  inputRequire ? "input-error" : ""
                }`}
                value={formData.name}
                onChange={(e) => onInputChange(e.target.id, e.target.value)}
              />
              {inputRequire && (
                <label className="label py-1">
                  <span className="label-text-alt text-error font-medium">
                    Full Name is required
                  </span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-medium">Username</span>
              </label>
              <input
                type="text"
                id="username"
                placeholder="johndoe"
                className="input input-bordered w-full focus:input-primary transition-all"
                value={formData.username}
                onChange={(e) => onInputChange(e.target.id, e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-medium">Email Address</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="john@example.com"
                className={`input input-bordered w-full focus:input-primary transition-all ${
                  !emailValid ? "input-error" : ""
                }`}
                value={formData.email}
                onChange={(e) => onInputChange(e.target.id, e.target.value)}
                required
              />
              {!emailValid && (
                <label className="label py-1">
                  <span className="label-text-alt text-error font-medium">
                    Email must include both "@" and "." characters.
                  </span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-medium">Phone Number</span>
              </label>
              <input
                type="text"
                id="phone"
                placeholder="1-770-736-8031"
                className="input input-bordered w-full focus:input-primary transition-all"
                value={formData.phone}
                onChange={(e) => onInputChange(e.target.id, e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label py-1">
              <span className="label-text font-medium">Website</span>
            </label>
            <input
              type="text"
              id="website"
              placeholder="hildegard.org"
              className="input input-bordered w-full focus:input-primary transition-all"
              value={formData.website}
              onChange={(e) => onInputChange(e.target.id, e.target.value)}
              required
            />
          </div>
        </div>

        {/* Section 2: Address Information */}
        <div className="card bg-base-100 shadow-sm border border-base-200 p-5 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Address Info
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-medium">Street</span>
              </label>
              <input
                type="text"
                id="address.street"
                placeholder="Kulas Light"
                className="input input-bordered w-full focus:input-primary transition-all"
                value={formData.address.street}
                onChange={(e) => onInputChange(e.target.id, e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-medium">Suite</span>
              </label>
              <input
                type="text"
                id="address.suite"
                placeholder="Apt. 556"
                className="input input-bordered w-full focus:input-primary transition-all"
                value={formData.address.suite}
                onChange={(e) => onInputChange(e.target.id, e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-medium">City</span>
              </label>
              <input
                type="text"
                id="address.city"
                placeholder="Gwenborough"
                className="input input-bordered w-full focus:input-primary transition-all"
                value={formData.address.city}
                onChange={(e) => onInputChange(e.target.id, e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-medium">Zipcode</span>
              </label>
              <input
                type="text"
                id="address.zipcode"
                placeholder="92998-3874"
                className="input input-bordered w-full focus:input-primary transition-all"
                value={formData.address.zipcode}
                onChange={(e) => onInputChange(e.target.id, e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-sm border border-base-200 p-5 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h5m-5 0V10m0 0V5"
              />
            </svg>
            Company Info
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-medium">Company Name</span>
              </label>
              <input
                type="text"
                id="company.name"
                placeholder="Romaguera-Crona"
                className="input input-bordered w-full focus:input-primary transition-all"
                value={formData.company.name}
                onChange={(e) => onInputChange(e.target.id, e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-medium">Catchphrase</span>
              </label>
              <input
                type="text"
                id="company.catchPhrase"
                placeholder="Multi-layered client-server neural-net"
                className="input input-bordered w-full focus:input-primary transition-all"
                value={formData.company.catchPhrase}
                onChange={(e) => onInputChange(e.target.id, e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            onClick={() => navigate("/")}
            type="button"
            className="btn btn-ghost border border-base-300 hover:bg-base-200"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary px-6">
            Create User
          </button>
        </div>
      </form>
    </div>
  );
}
