"use client";

import { useClerk, useSignIn, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const AdminLoginPage = () => {
  const { isLoaded: userLoaded, isSignedIn, user } = useUser();
  const { signIn, errors, fetchStatus } = useSignIn();
  const { signOut } = useClerk();
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [checking, setChecking] = useState(false);

  const verifying = useRef(false);

  // Already signed in as admin -> go straight to the admin dashboard
  useEffect(() => {
    if (!userLoaded || !isSignedIn || !user || verifying.current) return;

    if (user.publicMetadata?.role === "admin") {
      router.replace("/admin");
    }
  }, [userLoaded, isSignedIn, user, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!signIn || checking) return;

    setFormError("");
    setChecking(true);
    verifying.current = true;

    try {
      // If another user is already signed in, clear that session first
      if (isSignedIn) await signOut(() => {});

      const { error } = await signIn.password({
        identifier,
        password,
      });

      if (error) {
        console.error(JSON.stringify(error, null, 2));
        return;
      }

      if (signIn.status !== "complete") {
        setFormError(
          "Additional verification is required to sign in."
        );
        return;
      }

      const captured: { role?: unknown } = {};

      await signIn.finalize({
        navigate: async ({ session }) => {
          captured.role = session?.user?.publicMetadata?.role;
        },
      });

      if (captured.role !== "admin") {
        await signOut(() => {});

        setFormError(
          "This account does not have administrator access."
        );

        return;
      }

      router.replace("/admin");
    } catch (error) {
      console.error("Admin login error:", error);
      setFormError("Something went wrong. Please try again.");
    } finally {
      verifying.current = false;
      setChecking(false);
    }
  };

  const busy = fetchStatus === "fetching" || checking;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="
          w-full
          max-w-107.5
          overflow-hidden
          rounded-xl
          border-t-4
          border-blue-600
          bg-white
          shadow-xl
          ring-1
          ring-slate-200
        "
      >
        {/* Main Content */}
        <div className="px-6 py-8 sm:px-7 sm:py-9">
          {/* Logo */}
          <div className="flex justify-center">
            <Image
              src="/school-logo.png"
              alt="Shri Krishna Inter College"
              width={92}
              height={92}
              priority
              className="h-23 w-23 object-contain"
            />
          </div>

          {/* School Name */}
          <h1
            className="
              mt-4
              text-center
              text-[21px]
              font-bold
              tracking-[0.3px]
              text-slate-900
              sm:text-[22px]
            "
          >
            SHRI KRISHNA INTER COLLEGE
          </h1>

          {/* Login Heading */}
          <h2 className="mt-11 text-sm font-medium text-slate-700">
            Administrator Login
          </h2>

          {/* Error */}
          {formError && (
            <div className="mt-3 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {formError}
            </div>
          )}

          {/* Username */}
          <div className="mt-3 flex flex-col gap-2">
            <label
              htmlFor="identifier"
              className="text-sm font-medium text-slate-600"
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
              autoComplete="username"
              className="
                h-10.25
                w-full
                rounded-lg
                border
                border-slate-300
                bg-white
                px-3
                text-[14px]
                text-slate-700
                outline-none
                transition-colors
                placeholder:text-slate-400
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
            />

            {errors?.fields?.identifier && (
              <p className="text-sm text-red-600">
                {errors.fields.identifier.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mt-4 flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-600"
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
              autoComplete="current-password"
              className="
                h-10.25
                w-full
                rounded-lg
                border
                border-slate-300
                bg-white
                px-3
                text-[14px]
                text-slate-700
                outline-none
                transition-colors
                placeholder:text-slate-400
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
            />

            {errors?.fields?.password && (
              <p className="text-sm text-red-600">
                {errors.fields.password.message}
              </p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={busy}
            className="
              mt-6
              h-10.25
              w-full
              rounded-lg
              bg-blue-600
              px-4
              text-[14px]
              font-semibold
              text-white
              transition-colors
              hover:bg-blue-700
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {busy ? "Signing in..." : "Sign in as Admin"}
          </button>
        </div>

        {/* Footer */}
        <div
          className="
            border-t
            border-slate-200
            bg-slate-50
            px-4
            py-4
            text-center
          "
        >
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Shri Krishna Inter College
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Education • Discipline • Excellence
          </p>
        </div>
      </form>
    </div>
  );
};

export default AdminLoginPage;