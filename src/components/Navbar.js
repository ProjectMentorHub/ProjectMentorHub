// src/components/Navbar.js
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineShoppingCart, HiMenu, HiX } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const NavItem = ({ to, children, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      [
        "px-3 py-2 rounded-xl text-sm font-medium transition",
        "hover:bg-gray-100",
        isActive ? "bg-gray-900 text-white hover:bg-gray-900" : "text-gray-700",
      ].join(" ")
    }
  >
    {children}
  </NavLink>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logOut } = useAuth();
  const { getCartItemCount } = useCart();
  const navigate = useNavigate();
  const cartCount = getCartItemCount();

  const handleSignOut = async () => {
    await logOut();
    navigate("/");
    setOpen(false);
  };

  const avatarLetter = user?.displayName?.[0]?.toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bar */}
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-black text-white grid place-items-center font-semibold">
              P
            </div>
            <NavLink to="/" className="text-lg sm:text-xl font-semibold tracking-tight">
              ProjectMentorHub
            </NavLink>
          </div>

          {/* Center: Desktop links */}
          <div className="hidden md:flex items-center gap-2">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/catalog">Catalog</NavItem>
            <NavItem to="/about">About</NavItem>
            <NavItem to="/journals">Journal Services</NavItem>
            <NavItem to="/dashboard">Dashboard</NavItem>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <button
              onClick={() => navigate("/cart")}
              className="relative p-2 rounded-xl hover:bg-gray-100 transition"
              aria-label="Cart"
            >
              <HiOutlineShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-gray-900 text-white text-[10px] grid place-items-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User / Auth */}
            {user ? (
              <div className="hidden sm:flex items-center gap-3">
                <div
                  className="h-9 w-9 rounded-full bg-black text-white grid place-items-center text-sm"
                  title={user.displayName || user.email}
                >
                  {avatarLetter}
                </div>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 rounded-xl border border-gray-300 hover:border-gray-400 text-sm font-medium transition"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="hidden sm:inline-flex px-4 py-2 rounded-xl bg-gray-900 text-white hover:bg-black text-sm font-medium transition"
              >
                Sign In
              </button>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition"
              onClick={() => setOpen((s) => !s)}
              aria-label="Toggle menu"
            >
              {open ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile panel */}
        {open && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            <div className="pt-3 grid gap-2">
              <NavItem to="/" onClick={() => setOpen(false)}>Home</NavItem>
              <NavItem to="/catalog" onClick={() => setOpen(false)}>Catalog</NavItem>
              <NavItem to="/about" onClick={() => setOpen(false)}>About</NavItem>
              <NavItem to="/journals" onClick={() => setOpen(false)}>Journal Services</NavItem>
              <NavItem to="/dashboard" onClick={() => setOpen(false)}>Dashboard</NavItem>

              <div className="mt-2 flex items-center gap-3">
                {user ? (
                  <>
                    <div className="h-8 w-8 rounded-full bg-black text-white grid place-items-center text-xs">
                      {avatarLetter}
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="px-3 py-2 rounded-xl border border-gray-300 text-sm font-medium w-full text-left"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => { navigate("/login"); setOpen(false); }}
                    className="px-3 py-2 rounded-xl bg-gray-900 text-white text-sm font-medium w-full text-left"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
