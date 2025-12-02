import "../Styles/nav.css";
import { NavLink, useLocation } from "react-router";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../../supabaseClient";

function Navs({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <li className={isActive ? "active" : ""}>
      <NavLink to={to}>{children}</NavLink>
    </li>
  );
}

function initialsFromProfile(profile) {
  if (!profile) return "?";
  const name = profile?.user_metadata?.full_name || profile?.email || "?";
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export default function NavBar() {
  const [profile, setProfile] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const toastTimer = useRef(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      const { data } = await supabase.auth.getUser();
      if (!mounted) return;
      setProfile(data?.user || null);

      // show the one-time toast triggered by login flow
      try {
        const flag = sessionStorage.getItem("dm_show_login_toast");
        if (flag) {
          // remove flag and show toast for 3 seconds
          sessionStorage.removeItem("dm_show_login_toast");
          setShowToast(true);
          toastTimer.current = setTimeout(() => setShowToast(false), 3000);
        }
      } catch (e) {
        // ignore storage errors
      }
    }

    load();
    // subscribe to auth changes so UI updates without a full reload
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setProfile(null);
      }
      if (event === "SIGNED_IN") {
        setProfile(session?.user || null);
      }
    });
    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe && sub.subscription.unsubscribe();
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setProfile(null);
    setDropdownOpen(false);
    // optional: refresh page or navigate to home
    window.location.href = "/";
  }

  return (
    <nav className="glass-nav-demo ">
      <ul className="flex gap-4 items-center">
        <Navs to="/boliger">Boliger til salg</Navs>
        <Navs to="/maegler">Mæglere</Navs>
        <Navs to="/favoritter">Mine favoritter</Navs>
        <Navs to="/Contact">Kontakt os</Navs>

        <li className="ml-auto relative">
          {/* If logged in we don't show the profile avatar in the nav (header handles that) */}
          {!profile && (
            <NavLink to="/Login" className="hover:underline">
              Log ind
            </NavLink>
          )}
          {profile && <div className="text-sm text-gray-600 px-4"></div>}
        </li>

        {showToast && (
          // place the toast below the header to avoid overlapping the profile avatar
          <div className="fixed top-40 right-4 bg-green-600 text-white px-4 py-2 rounded shadow z-50">
            welcome
          </div>
        )}
      </ul>
    </nav>
  );
}
