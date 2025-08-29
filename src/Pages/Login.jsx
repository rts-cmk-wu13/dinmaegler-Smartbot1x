import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import "../Styles/socialButtons.css";
import Heroaccount from "../Components/Heroaccount";
import { useState } from "react";
import { login, getCurrentUser } from "../api/auth";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  return (
    <>
      <Heroaccount
        title="Account Login"
        breadcrumbs={[
          { text: "Home", active: false },
          { text: "Login", active: true },
        ]}
      />

      <div className="min-h-screen flex flex-col justify-center items-center bg-white-50">
        <div
          className="w-full max-w-md bg-white rounded-lg p-8"
          style={{ boxShadow: "0 10px 30px 0 rgba(0, 0, 0, 0.75)" }}
        >
          <h2 className="text-2xl font-semibold text-center mb-6">
            Log ind på din konto
          </h2>
          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              setError(null);
              setLoading(true);
              try {
                await login(email, password);

                await getCurrentUser();
                navigate("/");
              } catch (err) {
                console.error("Login error", err);
                setError(err?.message || "Login failed");
              } finally {
                setLoading(false);
              }
            }}
          >
            <div>
              <label className="block text-sm mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
              />
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#162A41] cursor-pointer text-white py-2 rounded hover:bg-[#162A51] transition disabled:opacity-60"
            >
              {loading ? "Logger ind..." : "Log ind"}
            </button>
          </form>
          {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
          <div className="mt-6">
            <p className="text-sm mb-2">Log ind med</p>
            <div className="social-buttons">
              {/* Google Button */}
              <button className="social-btn google">
                <div className="gradient" />
                <div className="icon">
                  <FcGoogle className="text-3xl" />
                </div>
              </button>
              {/* Facebook Button */}
              <button className="social-btn facebook">
                <div className="gradient" />
                <div className="icon">
                  <FaFacebookF className="text-3xl" />
                </div>
              </button>
              {/* Twitter Button */}
              <button className="social-btn twitter">
                <div className="gradient" />
                <div className="icon">
                  <FaTwitter className="text-3xl" />
                </div>
              </button>
            </div>
          </div>
          <p className="text-center text-sm mt-6">
            Har du ikke en konto?{" "}
            <Link to="/Register" className="text-blue-600 hover:underline">
              Opret bruger.
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
