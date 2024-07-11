import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";
import Header from "../Header";

export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null)
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");
    window.location.href = "/";
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  // if (redirect) {
  //     return <Navigate to={redirect} />;
  // }

  return (
    <>
      <Header />
      <div>
        <AccountNav />
        {subpage === "profile" && (
          <div className="text-center max-w-lg mx-auto">
            Logged in as {user.name} ({user.email}) {isAdmin}<br />
            <button onClick={logout} className="primary max-w-sm mt-2">
              Logout
            </button>
          </div>
        )}
        {subpage === "places" && <PlacesPage />}
      </div>
    </>
  );
}
