import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req : NextRequest) {
    const token = (await cookies()).get('token')
    if (!token) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }
    return NextResponse.redirect(new URL('/dashboard', req.url));
}

export const config = {
  matcher: ['/'],
};