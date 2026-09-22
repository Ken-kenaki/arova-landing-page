import { NextResponse } from "next/server";
import { createSessionClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";

export async function POST(): Promise<NextResponse> {
  try {
    const { account } = await createSessionClient();

    // Delete the current session
    await account.deleteSession("current");

    // Clear the session cookie
    const cookieStore = await cookies();
    cookieStore.delete("my-custom-session");

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Logout error:", error);

    // Even if session deletion fails, clear the cookie
    const cookieStore = await cookies();
    cookieStore.delete("my-custom-session");

    return NextResponse.json({ success: true });
  }
}
