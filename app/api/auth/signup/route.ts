import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/server/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { ID } from "node-appwrite";
import { cookies } from "next/headers";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { email, password, name } = (await request.json()) as {
      email?: string;
      password?: string;
      name?: string;
    };

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const { account, databases } = await createAdminClient();

    // Create user account
    const user = await account.create(ID.unique(), email, password, name);

    // Save user profile to database
    try {
      await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.userProfiles,
        ID.unique(),
        {
          userId: user.$id,
          fullName: name,
          email: email,
          role: "user",
          joinedWaitlist: "false",
          presentationType: "",
          frequency: "",
          createdAt: new Date().toISOString(),
        }
      );
    } catch (profileError) {
      console.error("Failed to create user profile:", profileError);
      // Don't fail signup if profile creation fails
    }

    // Create email password session immediately after signup
    const session = await account.createEmailPasswordSession(email, password);

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set("my-custom-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Signup error:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Signup failed. Please try again later.";
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
