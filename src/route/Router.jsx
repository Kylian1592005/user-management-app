import { Route, Routes } from "react-router";
import App from "../App";
import UserDetails from "../components/UserDetails";

export default function Router() {
  return (
    <Routes>
      <Route index element={<App />} />
      <Route path="users/:id" element={<UserDetails />} />
    </Routes>
  );
}
