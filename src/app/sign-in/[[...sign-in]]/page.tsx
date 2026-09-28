"use client";

import { useClerk, useSignIn, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Role = "student" | "teacher";

const ROLES: Role[] = ["student", "teacher"];

const label = (r: string) =>
  r.charAt(0).toUpperCase() + r.slice(1);

const LoginPage = () => {
  const { isLoaded: userLoaded, isSignedIn, user } = useUser();
  const { signIn, errors, fetchStatus } = useSignIn();
  const { signOut } = useClerk();
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] =
    useState<Role>("student");
  const [roleError, setRoleError] = useState("");
  const [checking, setChecking] = useState(false);

  const verifying = useRef(false);

  // Redirect already logged-in users to their own dashboard
  useEffect(() => {
    if (
      !userLoaded ||
      !isSignedIn ||
      !user ||
      verifying.current
    )
      return;

    const actualRole = user.publicMetadata?.role;

    if (actualRole === "student") {
      router.replace("/student");
    } else if (actualRole === "teacher") {
      router.replace("/teacher");
    }
  }, [userLoaded, isSignedIn, user, router]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!signIn || checking) return;

    setRoleError("");
    setChecking(true);
    verifying.current = true;

    try {
      if (isSignedIn) {
        await signOut(() => {});
      }

      // 1. Authenticate with Clerk
      const { error } = await signIn.password({
        identifier,
        password,
      });

      if (error) {
        console.error(JSON.stringify(error, null, 2));
        return;
      }

      if (signIn.status !== "complete") {
        setRoleError(
          "Additional verification is required to sign in."
        );
        return;
      }

      // 2. Finalize authentication and get actual role
      const captured: { role?: unknown } = {};

      await signIn.finalize({
        navigate: async ({ session }) => {
          captured.role =
            session?.user?.publicMetadata?.role;
        },
      });

      const actualRole = captured.role;

      // 3. No role
      if (!actualRole) {
        await signOut(() => {});

        setRoleError(
          "No role is assigned to this account. Please contact the administrator."
        );

        return;
      }

      // 4. Role mismatch
      if (actualRole !== selectedRole) {
        await signOut(() => {});

        if (
          actualRole === "student" ||
          actualRole === "teacher"
        ) {
          setRoleError(
            `This account is registered as ${label(
              actualRole
            )}. Please select ${label(
              actualRole
            )} to continue.`
          );
        } else {
          setRoleError(
            "This account is not allowed to use this login."
          );
        }

        return;
      }

      // 5. Correct role
      router.replace(`/${selectedRole}`);
    } catch (error) {
      console.error("Login error:", error);

      setRoleError(
        "Something went wrong. Please try again."
      );
    } finally {
      verifying.current = false;
      setChecking(false);
    }
  };

  const busy =
    fetchStatus === "fetching" || checking;

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8">

      {/* Main Login Card */}
      <div className="w-full max-w-md">

        <form
          onSubmit={handleSubmit}
          className="
            overflow-hidden
            rounded-xl
            bg-white
            shadow-xl
            border border-slate-200
          "
        >

          {/* Red Top Border */}
          <div className="h-1 bg-blue-600" />

          {/* School Header */}
          <div className="flex flex-col items-center px-6 pt-8 pb-4 text-center">

            <div className="relative w-24 h-24 mb-3">
              <Image
                src="/school-logo.png"
                alt="Shri Krishna Inter College Logo"
                fill
                priority
                className="object-contain"
              />
            </div>

            <h1 className="text-xl font-semibold uppercase text-slate-900 md:text-2xl">
              Shri Krishna Inter College
            </h1>

          </div>

          {/* Divider */}
          {/* <div className="mx-6 border-t border-gray-200" /> */}

          {/* Login Section */}
          <div className="px-6 py-7">


            {/* Role Selection */}
            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-slate-600">
                Login as
              </label>

              <div className="grid grid-cols-2 gap-3">

                {ROLES.map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => {
                      setSelectedRole(role);
                      setRoleError("");
                    }}
                    className={`
                      rounded-lg
                      border
                      px-4
                      py-2.5
                      text-sm
                      font-medium
                      capitalize
                      transition-all
                      duration-200

                      ${
                        selectedRole === role
                          ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                          : "border-slate-300 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50"
                      }
                    `}
                  >
                    {label(role)}
                  </button>
                ))}

              </div>
            </div>

            {/* Error */}
            {roleError && (
              <div className="mb-5 rounded-md border border-red-200 bg-red-50 px-3 py-3 text-sm text-red-600">
                {roleError}
              </div>
            )}

            {/* Username */}
            <div className="mb-4">
              <label
                htmlFor="identifier"
                className="mb-2 block text-sm font-medium text-slate-600"
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
                autoComplete="username"
                className="
                  w-full
                  rounded-lg
                  border border-slate-300
                  bg-white
                  px-3
                  py-2.5
                  text-sm
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
                <p className="mt-1 text-sm text-red-600">
                  {errors.fields.identifier.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-600"
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
                autoComplete="current-password"
                className="
                  w-full
                  rounded-lg
                  border border-slate-300
                  bg-white
                  px-3
                  py-2.5
                  text-sm
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
                <p className="mt-1 text-sm text-red-600">
                  {errors.fields.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={busy}
              className="
                w-full
                rounded-lg
                bg-blue-600
                px-4
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition-colors
                hover:bg-blue-700
                focus:outline-none
                focus:ring-2
                focus:ring-blue-200
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {busy
                ? "Signing in..."
                : `Login in as ${label(selectedRole)}`}
            </button>

          </div>

          {/* Footer inside card */}
          <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 text-center">

            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Shri Krishna Inter College
            </p>

            <p className="mt-1 text-[11px] text-gray-400">
              Education • Discipline • Excellence
            </p>

          </div>

        </form>

      </div>
    </main>
  );
};

export default LoginPage;