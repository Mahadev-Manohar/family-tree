import { Person } from "@prisma/client";
import { TreeNode } from "@/types/tree";

type PersonWithRelations =
  Person & {
    spouse?: Person | null;
  };

export function buildTree(
  people: PersonWithRelations[]
): TreeNode | null {
  const root =
    people.find(
      (person) =>
        person.isRootAncestor
    );

  if (!root) {
    return null;
  }

  function createNode(
    person: Person
  ): TreeNode {
    const spouse =
      people.find(
        (p) =>
          p.id === person.spouseId
      );

    const children =
        people.filter((child) => {
            // primary parent = father
            if (child.fatherId) {
            return (
                child.fatherId ===
                person.id
            );
            }

            // fallback = mother
            return (
            child.motherId ===
            person.id
            );
        });

    return {
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

      profileImageUrl:
        person.profileImageUrl,

      spouse: spouse
        ? {
            id: spouse.id,

            fullName:
                spouse.fullName,

            birthDisplay:
                spouse.birthDisplay,

            gender:
                spouse.gender,

            isAlive:
                spouse.isAlive,
            }
        : null,

      children:
        children.map(
          createNode
        ),
    };
  }

  return createNode(root);
}