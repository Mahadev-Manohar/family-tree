import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const person =
      await prisma.person.create({
        data: {
          fullName:
            body.fullName,

          gender:
            body.gender,

          birthDisplay:
            body.birthDisplay ||
            null,

          deathDisplay:
            body.deathDisplay ||
            null,

          bio:
            body.bio || null,

          profileImageUrl:
            body.profileImageUrl ||
            null,

          isAlive:
            body.isAlive,

          isRootAncestor:
            body.isRootAncestor,

          fatherId:
            body.fatherId ||
            null,

          motherId:
            body.motherId ||
            null,

          spouseId:
            body.spouseId ||
            null,
        },
      });

    // auto spouse sync
    if (body.spouseId) {
      await prisma.person.update({
        where: {
          id: body.spouseId,
        },

        data: {
          spouseId: person.id,
        },
      });
    }

    return NextResponse.json(
      person
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to create person",
      },
      {
        status: 500,
      }
    );
  }
}