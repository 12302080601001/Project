import prisma from "@/app/libs/prismadb";

// Fetch listings from the database
export async function getListings() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc", // Sort by creation date in descending order
      },
    });

    // Sanitize the output for safe serialization
    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    console.error("Error fetching listings:", error);
    throw new Error("Failed to fetch listings");
  }
}
