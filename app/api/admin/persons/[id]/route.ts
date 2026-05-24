import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function PUT(
  request: Request,
  { params }: Props
) {
  try {
    const { id } = await params;

    const body =
      await request.json();

    const updatedPerson =
      await prisma.person.update({
        where: {
          id,
        },

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

          isAlive:
            body.isAlive,

          isRootAncestor:
            body.isRootAncestor,

          fatherId:
            body.fatherId || null,

          motherId:
            body.motherId || null,

          spouseId:
            body.spouseId || null,
        },
      });

    return NextResponse.json(
      updatedPerson
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to update person",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: Props
) {
  try {
    const { id } = await params;

    await prisma.person.update({
      where: {
        id,
      },

      data: {
        isDeleted: true,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to delete person",
      },
      {
        status: 500,
      }
    );
  }
}