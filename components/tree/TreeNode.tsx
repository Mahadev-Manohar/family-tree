import { TreeNode as TreeNodeType }
  from "@/types/tree";

type Props = {
  node: TreeNodeType;
};

export default function TreeNode({
  node,
}: Props) {
  return (
    <div className="ml-6 mt-4">
      <div
        className="
          border
          border-zinc-700
          rounded-lg
          p-4
          bg-zinc-900
          inline-block
        "
      >
        <div className="font-bold">
          {node.fullName}
        </div>

        <div className="text-sm text-zinc-400">
          {node.birthDisplay ||
            "Unknown Birth"}
        </div>

        {node.spouse && (
          <div
            className="
              text-sm
              mt-2
              text-blue-400
            "
          >
            Spouse:
            {" "}
            {
              node.spouse
                .fullName
            }
          </div>
        )}
      </div>

      {node.children.length >
        0 && (
        <div
          className="
            border-l
            border-zinc-700
            pl-6
            ml-4
            mt-4
          "
        >
          {node.children.map(
            (child) => (
              <TreeNode
                key={child.id}
                node={child}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}