import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="bg-blue-600 w-screen h-screen flex items-center justify-center">
        <div className="w-full text-center">
          <button
            className="bg-white p-2 px-2 rounded-lg"
            onClick={() => signIn("google")} // Pass provider as a string
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p>Signed in as {session.user.email}</p>
      <button
        className="bg-red-500 text-white p-2 px-4 rounded-lg mt-4"
        onClick={() => signOut()}
      >
        Sign out
      </button>
    </div>
  );
}
