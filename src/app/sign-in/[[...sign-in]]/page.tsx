"use client";

import { useSignIn, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Role = "student" | "teacher" | "admin";

const LoginPage = () => {
  const { isLoaded: userLoaded, isSignedIn, user } = useUser();
  const { signIn, errors, fetchStatus } = useSignIn();
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role>("student");
  const [roleError, setRoleError] = useState("");

  useEffect(() => {
    if (!userLoaded || !isSignedIn || !user) return;

    const actualRole = user.publicMetadata?.role as
      | Role
      | undefined;

    if (!actualRole) {
      setRoleError(
        "No role is assigned to this account. Please contact the administrator."
      );
      return;
    }

    if (actualRole !== selectedRole) {
      setRoleError(
        `This account is registered as ${actualRole}. Please select "${actualRole}" to continue.`
      );
      return;
    }

    router.replace(`/${actualRole}`);
  }, [
    userLoaded,
    isSignedIn,
    user,
    selectedRole,
    router,
  ]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!signIn) return;

    setRoleError("");

    try {
      const { error } = await signIn.password({
        identifier,
        password,
      });

      if (error) {
        console.error(JSON.stringify(error, null, 2));
        return;
      }

      if (signIn.status === "complete") {
        await signIn.finalize({
          navigate: async ({ decorateUrl }) => {
            const url = decorateUrl("/sign-in");
            router.replace(url);
          },
        });
      } else {
        console.error(
          "Sign-in attempt not complete:",
          signIn.status
        );
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-lamaSkyLight px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 md:p-12 rounded-xl shadow-2xl flex flex-col gap-4 w-full max-w-md"
      >
        <div className="flex items-center gap-2">
          <Image
            src="/school-logo.png"
            alt="Shri Krishna Inter College"
            width={32}
            height={32}
            className="w-8 h-8 object-cover rounded"
          />

          <h1 className="text-xl font-bold">
            Shri Krishna Inter College
          </h1>
        </div>

        <h2 className="text-gray-400">
          Sign in to your account
        </h2>

        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-500">
            Login as
          </label>

          <div className="grid grid-cols-3 gap-2">
            {(["student", "teacher", "admin"] as Role[]).map(
              (role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => {
                    setSelectedRole(role);
                    setRoleError("");
                  }}
                  className={`py-2.5 rounded-md text-sm font-medium border capitalize transition ${
                    selectedRole === role
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {role}
                </button>
              )
            )}
          </div>
        </div>

        {roleError && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-md">
            {roleError}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label
            htmlFor="identifier"
            className="text-xs text-gray-500"
          >
            Username
          </label>

          <input
            id="identifier"
            type="text"
            required
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Enter your username"
            className="p-2.5 rounded-md ring-1 ring-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
          />

          {errors?.fields?.identifier && (
            <p className="text-xs text-red-500">
              {errors.fields.identifier.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-xs text-gray-500"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="p-2.5 rounded-md ring-1 ring-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
          />

          {errors?.fields?.password && (
            <p className="text-xs text-red-500">
              {errors.fields.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={fetchStatus === "fetching"}
          className="bg-blue-500 text-white my-1 rounded-md text-sm p-2.5 disabled:opacity-50 hover:bg-blue-600 transition"
        >
          {fetchStatus === "fetching"
            ? "Signing in..."
            : `Sign in as ${selectedRole}`}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;