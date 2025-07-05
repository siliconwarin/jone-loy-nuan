import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
	let response = NextResponse.next({
		request: {
			headers: request.headers,
		},
	});

	try {
		const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
		const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

		// If env variables are missing simply skip the session handling
		if (!supabaseUrl || !supabaseKey) {
			console.warn(
				"[middleware] Supabase env vars missing – skipping session sync"
			);
			return response;
		}

		const supabase = createServerClient(supabaseUrl, supabaseKey, {
			cookies: {
				get(name: string) {
					return request.cookies.get(name)?.value;
				},
				set(name: string, value: string, options: CookieOptions) {
					request.cookies.set({
						name,
						value,
						...options,
					});
					response = NextResponse.next({
						request: {
							headers: request.headers,
						},
					});
					response.cookies.set({
						name,
						value,
						...options,
					});
				},
				remove(name: string, options: CookieOptions) {
					request.cookies.set({
						name,
						value: "",
						...options,
					});
					response = NextResponse.next({
						request: {
							headers: request.headers,
						},
					});
					response.cookies.set({
						name,
						value: "",
						...options,
					});
				},
			},
		});

		// this will refresh session cookie, ignore result
		await supabase.auth.getUser();
	} catch (error) {
		console.error("[middleware] updateSession error", error);
		// Return the original response even if session fetch fails
		return response;
	}

	return response;
}
