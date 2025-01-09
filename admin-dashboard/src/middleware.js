import { NextResponse } from "next/server";

export function middleware(req) {
    const token = req.cookies.get("token")?.value;

    if (!token && req.nextUrl.pathname !== "/login") {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/users/:path*", "/services/:path*", "/appointments/:path*"],
};
