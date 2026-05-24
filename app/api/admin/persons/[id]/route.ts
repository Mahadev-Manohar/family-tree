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
    const { id } =
      await params;

    const body =
      await request.json();

    const existingPerson =
      await prisma.person.findUnique({
        where: {
          id,
        },
      });

    if (!existingPerson) {
      return NextResponse.json(
        {
          error:
            "Person not found",
        },
        {
          status: 404,
        }
      );
    }

    // clear old spouse
    if (
      existingPerson.spouseId &&
      existingPerson.spouseId !==
        body.spouseId
    ) {
      await prisma.person.update({
        where: {
          id:
            existingPerson.spouseId,
        },

        data: {
          spouseId: null,
        },
      });
    }

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

    // sync new spouse
    if (body.spouseId) {
      await prisma.person.update({
        where: {
          id:
            body.spouseId,
        },

        data: {
          spouseId: id,
        },
      });
    }

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

export async function GET(
  request: Request,
  { params }: Props
) {
  try {
    const { id } =
      await params;

    const person =
      await prisma.person.findUnique({
        where: {
          id,
        },

        include: {
          spouse: {
            select: {
              id: true,
              fullName: true,
              gender: true,
              birthDisplay: true,
              isAlive: true,
            },
          },

          childrenFromFather:
            {
              select: {
                id: true,
                fullName: true,
              },
            },

          childrenFromMother:
            {
              select: {
                id: true,
                fullName: true,
              },
            },
        },
      });

    if (!person) {
      return NextResponse.json(
        {
          error:
            "Person not found",
        },
        {
          status: 404,
        }
      );
    }

    const children = [
      ...person.childrenFromFather,
      ...person.childrenFromMother,
    ];

    return NextResponse.json({
      id: person.id,
      fullName:
        person.fullName,
      gender:
        person.gender,
      birthDisplay:
        person.birthDisplay,
      deathDisplay:
        person.deathDisplay,
      bio: person.bio,
      isAlive:
        person.isAlive,
      spouse:
        person.spouse,
      children,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch person",
      },
      {
        status: 500,
      }
    );
  }
}