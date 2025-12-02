import HeroAccount from "../Components/Heroaccount";
import { useState } from "react";
import { supabase } from "../../supabaseClient";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!name.trim()) {
      setError("Indtast venligst dit fulde navn.");
      return;
    }
    if (!email.trim()) {
      setError("Indtast venligst en email-adresse.");
      return;
    }
    if (password.length < 6) {
      setError("Password skal være mindst 6 tegn.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords stemmer ikke overens.");
      return;
    }

    setLoading(true);

    try {
      // Use Supabase to sign up the user with email and password
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp(
          {
            email,
            password,
          },
          {
            data: { full_name: name },
          }
        );

      if (signUpError) throw signUpError;

      // Try to sign in immediately so the user doesn't need to confirm email
      // Note: this will only work if your Supabase project allows sign-in without email confirmation.
      const { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        // If sign-in fails due to required confirmation, tell the user what to change
        const needsConfirm =
          /confirm|verification|verification required|email confirmation/i.test(
            signInError.message || ""
          );

        if (needsConfirm) {
          setMessage(
            "Brugeren er oprettet. Bekræftelse kræves af din Supabase auth-opsætning — slå 'Email confirmations' fra i Supabase for automatisk login, eller tjek din email."
          );
        } else {
          setError(
            signInError.message || "Login mislykkedes efter oprettelse."
          );
        }
      } else {
        // Successfully signed in
        setMessage("Bruger oprettet og logget ind. Velkommen!");
      }

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.message || "Noget gik galt under oprettelsen af brugeren.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <HeroAccount
        title="Account Register"
        breadcrumbs={[
          { text: "Home", active: false },
          { text: "Register", active: true },
        ]}
      />
      <div className="min-h-screen flex flex-col justify-center items-center bg-white-50">
        <div
          className="w-full max-w-md bg-white rounded-lg p-8"
          style={{ boxShadow: "0 10px 30px 0 rgba(0, 0, 0, 0.75)" }}
        >
          <h2 className="text-2xl font-semibold text-center mb-6">
            Opret bruger hos din mægler
          </h2>

          {message && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
              {message}
            </div>
          )}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm mb-1" htmlFor="name">
                Fuld navn
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Fuld navn"
              />
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="email">
                Email addresse
              </label>
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email addresse"
              />
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
              />
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="confirm-password">
                Bekræft password
              </label>
              <input
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Bekræft password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#162A41] cursor-pointer text-white py-2 rounded hover:bg-[#162A51] transition disabled:opacity-60"
            >
              {loading ? "Opretter..." : "Opret bruger"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
