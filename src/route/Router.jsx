import { Route, Routes } from "react-router";
import Users from "../pages/Users";
import UserDetails from "../pages/UserDetails";

export default function Router() {
  return (
    <Routes>
      <Route index element={<Users />} />
      <Route path="users" element={<Users />} />
      <Route path="users/:id" element={<UserDetails />} />
    </Routes>
  );
}
