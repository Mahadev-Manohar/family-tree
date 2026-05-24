export type TreeNode = {
  id: string;

  fullName: string;

  gender: string;

  birthDisplay?: string | null;

  deathDisplay?: string | null;

  bio?: string | null;

  isAlive: boolean;

  profileImageUrl?: string | null;

  spouse?: {
    id: string;
    fullName: string;
    birthDisplay?: string | null;
  } | null;

  children: TreeNode[];
};