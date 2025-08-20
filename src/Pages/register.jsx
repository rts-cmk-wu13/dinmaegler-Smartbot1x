import HeroAccount from "../Components/Heroaccount";

export default function Register() {
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
          <form className="space-y-4">
            <div>
              <label className="block text-sm mb-1" htmlFor="name">
                Fuld navn
              </label>
              <input
                id="name"
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
                type="password"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Bekræft password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#162A41] cursor-pointer text-white py-2 rounded hover:bg-[#162A51] transition"
            >
              Opret bruger
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
