import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

// Add a listing to the user's favorites
export async function POST(
  request: Request,
  context: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  // Resolve params here
  const { listingId } = await context.params; // Await the resolution of context.params

  if (!listingId || typeof listingId !== "string") {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const favoriteIds = new Set(currentUser.favoriteIds || []);
  favoriteIds.add(listingId);

  try {
    const user = await prisma.user.update({
      where: { id: currentUser.id },
      data: { favoriteIds: Array.from(favoriteIds) },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update favorites" }, { status: 500 });
  }
}

// Remove a listing from the user's favorites
export async function DELETE(
  request: Request,
  context: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  // Resolve params here
  const { listingId } = await context.params; // Await the resolution of context.params

  if (!listingId || typeof listingId !== "string") {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const favoriteIds = new Set(currentUser.favoriteIds || []);
  favoriteIds.delete(listingId);

  try {
    const user = await prisma.user.update({
      where: { id: currentUser.id },
      data: { favoriteIds: Array.from(favoriteIds) },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update favorites" }, { status: 500 });
  }
}