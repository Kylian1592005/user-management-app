export default function EditForm({setIsEditing, formData, onInputChange, onSaveData }) {
  return (
    <form onSubmit={onSaveData} className="space-y-4 mt-4">
      <h2 className="text-sm font-bold uppercase tracking-wider text-primary mb-2">
        Edit User Details
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Full Name</span>
          </label>
          <input
            type="text"
            id="name"
            className="input input-bordered w-full focus:input-primary"
            value={formData.name}
            onChange={(e) => onInputChange(e.target.id, e.target.value)}
          />
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
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Email</span>
          </label>
          <input
            type="email"
            id="email"
            className="input input-bordered w-full focus:input-primary"
            value={formData.email}
            onChange={(e) => onInputChange(e.target.id, e.target.value)}
          />
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
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6 pt-2">
        <button
          type="button"
          onClick={() => setIsEditing(false)}
          className="btn btn-ghost"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
