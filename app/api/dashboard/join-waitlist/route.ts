import { NextRequest, NextResponse } from "next/server";
import { createSessionClient, createAdminClient } from "@/lib/server/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { ID, Query } from "node-appwrite";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Get the logged-in user
    const { account } = await createSessionClient();
    const user = await account.get();

    const { presentationType, frequency } = (await request.json()) as {
      presentationType?: string;
      frequency?: string;
    };

    if (!presentationType || !frequency) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const { databases } = await createAdminClient();

    // Add to waitlist collection
    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.waitlist,
      ID.unique(),
      {
        fullName: user.name,
        email: user.email,
        presentationType,
        frequency,
        nextPresentation: "",
        createdAt: new Date().toISOString(),
      }
    );

    // Update user profile to mark as joined waitlist
    try {
      const profiles = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.collections.userProfiles,
        [Query.equal("userId", user.$id)]
      );

      if (profiles.documents.length > 0) {
        await databases.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.collections.userProfiles,
          profiles.documents[0].$id,
          {
            joinedWaitlist: "true",
            presentationType,
            frequency,
          }
        );
      }
    } catch (profileError) {
      console.error("Failed to update user profile:", profileError);
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Dashboard waitlist error:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to join waitlist. Please try again.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
