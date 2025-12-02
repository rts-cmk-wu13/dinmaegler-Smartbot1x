import { IoIosSend, IoIosCall } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router";

import NavBar from "./NavBar";
import { useState, useEffect, useRef } from "react";
import { supabase } from "../../supabaseClient";

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const overlayRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // manage focus to avoid aria-hidden conflicts: when opening move focus into menu,
  // when closing, return focus to the toggle button if focus was inside the menu
  useEffect(() => {
    if (open) {
      // focus first focusable element inside the nav for accessibility
      try {
        const root = navRef.current;
        if (root) {
          const focusable = root.querySelector(
            'a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])'
          );
          if (focusable) focusable.focus();
        }
      } catch (e) {
        // ignore
      }
    } else {
      // if focus is inside the overlay/nav, move it back to the toggle button
      try {
        const overlay = overlayRef.current;
        const active = document.activeElement;
        if (overlay && active && overlay.contains(active)) {
          menuButtonRef.current?.focus();
        }
      } catch (e) {
        // ignore
      }
    }
    return () => {};
  }, [open]);

  return (
    <>
      <div className="bg-[#1a2a3a] text-white text-sm">
        <div className="container mx-auto flex justify-between items-center py-2 px-4 h-16">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1">
              <IoIosSend />
              <a
                href="mailto:4000@dinmaegler.com"
                className="hover:underline cursor-pointer"
              >
                4000@dinmaegler.com
              </a>
            </span>
            <span className="flex items-center space-x-1">
              <IoIosCall />
              <a
                href="tel:+4570704000"
                className="hover:underline cursor-pointer"
              >
                +45 7070 4000
              </a>
            </span>
          </div>
          <div>
            {/* Show profile avatar when logged in, otherwise show login link */}
            <ProfileArea />
          </div>
        </div>
      </div>

      <div className="bg-white shadow">
        <div className="container mx-auto flex justify-between items-center h-24">
          <div className="flex items-center space-x-2">
            <Link to={"/"}>
              <img
                className="h-[49px]  w-[296px] object-contain cursor-pointer"
                src="/icons/Frame.svg"
                alt="logo"
              />
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:block">
            <NavBar />
          </div>

          {/* Burger menu for mobile */}
          <div className="md:hidden">
            <button
              ref={menuButtonRef}
              aria-label="Toggle menu"
              aria-expanded={open}
              className={`wrapper-menu ${open ? "open" : ""}`}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="line-menu start"></span>
              <span className="line-menu middle"></span>
              <span className="line-menu end"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 md:hidden transition-all mobile-nav-overlay ${
          open
            ? "visible opacity-100 pointer-events-auto"
            : "invisible opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-[#162A41] bg-opacity-60 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <nav
          ref={navRef}
          role="dialog"
          aria-modal={open}
          aria-label="Mobile menu"
          className={`absolute right-0 top-0 h-full w-full sm:w-4/5 bg-white shadow-lg transform transition-transform ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6">
            <div className="mb-6 flex justify-end">
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="text-gray-600"
              >
                ✕
              </button>
            </div>
            {/* burger menu */}
            <ul className="flex flex-col gap-4 text-lg">
              <li>
                <Link to="/boliger" onClick={() => setOpen(false)}>
                  Boliger til salg
                </Link>
              </li>
              <li>
                <Link to="/maegler" onClick={() => setOpen(false)}>
                  Mæglere
                </Link>
              </li>
              <li>
                <Link to="/favoritter" onClick={() => setOpen(false)}>
                  Mine favoritter
                </Link>
              </li>
              <li>
                <Link to="/Contact" onClick={() => setOpen(false)}>
                  Kontakt os
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}

function ProfileArea() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      const { data } = await supabase.auth.getUser();
      if (!mounted) return;
      setUser(data?.user || null);
    }
    load();

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") setUser(null);
      if (event === "SIGNED_IN") setUser(session?.user || null);
    });

    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe && sub.subscription.unsubscribe();
    };
  }, []);

  function initials(Email) {
    if (!Email) return "?";
    const parts = Email.split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "?";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  function colorFromString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = Math.abs(hash) % 360;
    return `hsl(${h}deg 70% 45%)`;
  }

  async function handleLogout() {
    await supabase.auth.signOut();

    window.location.reload();
  }

  if (!user) {
    return (
      <Link
        to="/login"
        className="flex items-center space-x-1 hover:underline cursor-pointer"
      >
        <FaUser />
        <span>Log ind</span>
      </Link>
    );
  }

  const display = user.user_metadata?.full_name || user.email || "?";
  const initialsText = initials(display);
  const bg = colorFromString(user.id || user.email || "anon");

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-2 py-1 rounded-full bg-transparent text-white"
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white"
          style={{ background: bg }}
          title={display}
        >
          {initialsText}
        </div>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-[#162A41] rounded shadow-lg z-50 ">
          <div className="px-4 py-2 text-sm text-white-700">{display}</div>
          <button
            className="block w-full text-left px-4 py-2 hover:bg-[#162A41]"
            onClick={handleLogout}
          >
            Log ud
          </button>
        </div>
      )}
    </div>
  );
}
