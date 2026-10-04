import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewUser({ usersLists, setUsersLists }) {
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
      setEmailValid(
        value.length === 0 || (value.includes("@") && value.includes(".")),
      );
    }
  };

  const handleAddUser = (e) => {
    e.preventDefault();

    const isEmailValid =
      formData.email.includes("@") && formData.email.includes(".");
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
    <form onSubmit={handleAddUser} className="space-y-4 mt-4">
      <h2 className="text-sm font-bold uppercase tracking-wider text-primary mb-2">
        Form
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Full Name</span>
          </label>
          <input
            type="text"
            id="name"
            className={`input input-bordered w-full focus:input-primary ${
              inputRequire ? "input-error" : ""
            }`}
            value={formData.name}
            onChange={(e) => onInputChange(e.target.id, e.target.value)}
          />
          {inputRequire && (
            <label className="label">
              <span className="label-text-alt text-error font-medium">
                Full Name is required
              </span>
            </label>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Username</span>
          </label>
          <input
            type="text"
            id="username"
            className="input input-bordered w-full focus:input-primary"
            value={formData.username}
            onChange={(e) => onInputChange(e.target.id, e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Email</span>
          </label>
          <input
            type="text"
            id="email"
            className={`input input-bordered w-full focus:input-primary ${
              !emailValid ? "input-error" : ""
            }`}
            value={formData.email}
            onChange={(e) => onInputChange(e.target.id, e.target.value)}
            required
          />
          {!emailValid && (
            <label className="label">
              <span className="label-text-alt text-error font-medium">
                Email must include both "@" and "." characters.
              </span>
            </label>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Phone</span>
          </label>
          <input
            type="text"
            id="phone"
            className="input input-bordered w-full focus:input-primary"
            value={formData.phone}
            onChange={(e) => onInputChange(e.target.id, e.target.value)}
            required
          />
        </div>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Website</span>
        </label>
        <input
          type="text"
          id="website"
          className="input input-bordered w-full focus:input-primary"
          value={formData.website}
          onChange={(e) => onInputChange(e.target.id, e.target.value)}
          required
        />
      </div>

      <div className="divider my-2">Address</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Street</span>
          </label>
          <input
            type="text"
            id="address.street"
            className="input input-bordered w-full focus:input-primary"
            value={formData.address.street}
            onChange={(e) => onInputChange(e.target.id, e.target.value)}
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Suite</span>
          </label>
          <input
            type="text"
            id="address.suite"
            className="input input-bordered w-full focus:input-primary"
            value={formData.address.suite}
            onChange={(e) => onInputChange(e.target.id, e.target.value)}
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">City</span>
          </label>
          <input
            type="text"
            id="address.city"
            className="input input-bordered w-full focus:input-primary"
            value={formData.address.city}
            onChange={(e) => onInputChange(e.target.id, e.target.value)}
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Zipcode</span>
          </label>
          <input
            type="text"
            id="address.zipcode"
            className="input input-bordered w-full focus:input-primary"
            value={formData.address.zipcode}
            onChange={(e) => onInputChange(e.target.id, e.target.value)}
            required
          />
        </div>
      </div>

      <div className="divider my-2">Company</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Company Name</span>
          </label>
          <input
            type="text"
            id="company.name"
            className="input input-bordered w-full focus:input-primary"
            value={formData.company.name}
            onChange={(e) => onInputChange(e.target.id, e.target.value)}
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Catchphrase</span>
          </label>
          <input
            type="text"
            id="company.catchPhrase"
            className="input input-bordered w-full focus:input-primary"
            value={formData.company.catchPhrase}
            onChange={(e) => onInputChange(e.target.id, e.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6 pt-2">
        <button
          onClick={() => navigate("/")}
          type="button"
          className="btn btn-ghost"
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </div>
    </form>
  );
}
