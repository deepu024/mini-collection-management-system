export default function HomePage() {
  return (
    <main className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <h1 className="text-3xl font-bold mb-6">Mini Collection System</h1>
      <div className="flex space-x-6">
        <a
          href="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        >
          Login
        </a>
        <a
          href="/register"
          className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
        >
          Register
        </a>
      </div>
    </main>
  );
}
