import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { routeAccessMap } from "./lib/settings";
import { NextResponse } from "next/server";

const matchers = Object.keys(routeAccessMap).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccessMap[route],
}));

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();

  const role = (sessionClaims?.metadata as { role?: string })?.role;

  for (const { matcher, allowedRoles } of matchers) {
    if (matcher(req)) {
      // User is not logged in
      if (!userId) {
        return NextResponse.redirect(
          new URL("/sign-in", req.url)
        );
      }

      // User is logged in but has no role
      if (!role) {
        return NextResponse.redirect(
          new URL("/sign-in", req.url)
        );
      }

      // User doesn't have permission
      if (!allowedRoles.includes(role)) {
        return NextResponse.redirect(
          new URL(`/${role}`, req.url)
        );
      }
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};