import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/server/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { ID } from "node-appwrite";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { fullName, email, presentationType, frequency, nextPresentation } =
      (await request.json()) as {
        fullName?: string;
        email?: string;
        presentationType?: string;
        frequency?: string;
        nextPresentation?: string;
      };

    if (!fullName || !email || !presentationType || !frequency) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const { databases } = await createAdminClient();

    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.waitlist,
      ID.unique(),
      {
        fullName,
        email,
        presentationType,
        frequency,
        nextPresentation: nextPresentation || "",
        createdAt: new Date().toISOString(),
      }
    );

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Waitlist submission error:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to join waitlist. Please try again.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
