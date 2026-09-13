"use client";

import { useSignIn, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const { isLoaded: userLoaded, isSignedIn, user } = useUser();
  const { signIn, errors, fetchStatus } = useSignIn();

  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  // Redirect already logged-in users
  useEffect(() => {
  if (!userLoaded) return;

  console.log("isSignedIn:", isSignedIn);
  console.log("user:", user);
  console.log("role:", user?.publicMetadata?.role);

  if (isSignedIn) {
    const role = user?.publicMetadata?.role as string | undefined;

      if (role) {
        router.replace(`/${role}`);
      }
    }
  }, [userLoaded, isSignedIn, user, router]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!signIn) return;

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
          const url = decorateUrl("/");
          router.push(url);
        },
      });
    } else {
      console.error(
        "Sign-in attempt not complete:",
        signIn.status
      );
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-3 w-100"
      >
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Image
            src="/logo.jpeg"
            alt="Shri Krishna Inter College"
            width={24}
            height={24}
            className="w-6 h-auto"
          />

          Shri Krishna Inter College
        </h1>

        <h2 className="text-gray-400">
          Sign in to your account
        </h2>

        {/* Username */}
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
            onChange={(e) =>
              setIdentifier(e.target.value)
            }
            placeholder="Enter your username"
            className="p-2 rounded-md ring-1 ring-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
          />

          {errors?.fields?.identifier && (
            <p className="text-xs text-red-400">
              {errors.fields.identifier.message}
            </p>
          )}
        </div>

        {/* Password */}
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
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Enter your password"
            className="p-2 rounded-md ring-1 ring-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
          />

          {errors?.fields?.password && (
            <p className="text-xs text-red-400">
              {errors.fields.password.message}
            </p>
          )}
        </div>

        {/* Sign In */}
        <button
          type="submit"
          disabled={fetchStatus === "fetching"}
          className="bg-blue-500 text-white my-1 rounded-md text-sm p-2.5 disabled:opacity-50"
        >
          {fetchStatus === "fetching"
            ? "Signing in..."
            : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;