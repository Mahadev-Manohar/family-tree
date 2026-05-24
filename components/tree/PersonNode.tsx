import {
  Handle,
  Position,
} from "reactflow";

type Props = {
  data: {
    fullName: string;
    gender?: string;
    isAlive?: boolean;
    birthDisplay?:
      | string
      | null;

    spouse?: {
      fullName: string;
      gender?: string;
      isAlive?: boolean;
      birthDisplay?:
        | string
        | null;
    } | null;
  };
};

function genderDot(
  gender?: string
) {
  switch (gender) {
    case "MALE":
      return "bg-sky-500";

    case "FEMALE":
      return "bg-rose-500";

    default:
      return "bg-zinc-500";
  }
}

function statusColor(
  isAlive?: boolean
) {
  return isAlive
    ? "text-emerald-400"
    : "text-zinc-500";
}

export default function PersonNode({
  data,
}: Props) {
  return (
    <div
      className="
        relative
        min-w-[380px]
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-950
        px-5
        py-4
        shadow-sm
        transition
        hover:border-zinc-700
      "
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{
          opacity: 0,
        }}
      />

      <div className="flex items-stretch">
        {/* PERSON */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <div
              className={`
                w-2.5
                h-2.5
                rounded-full
                ${genderDot(
                  data.gender
                )}
              `}
            />

            <h3
              className="
                text-white
                font-semibold
                text-lg
                leading-none
              "
            >
              {data.fullName}
            </h3>
          </div>

          <div className="space-y-2">
            <div>
              <p
                className="
                  text-xs
                  uppercase
                  tracking-wide
                  text-zinc-500
                "
              >
                Birth
              </p>

              <p className="text-zinc-200 text-sm">
                {data.birthDisplay ??
                  "Unknown"}
              </p>
            </div>

            <p
              className={`
                text-sm
                font-medium
                ${statusColor(
                  data.isAlive
                )}
              `}
            >
              {data.isAlive
                ? "Living"
                : "Deceased"}
            </p>
          </div>
        </div>

        {/* DIVIDER */}
        {data.spouse && (
          <>
            <div
              className="
                mx-5
                w-px
                bg-zinc-800
              "
            />

            {/* SPOUSE */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className={`
                    w-2.5
                    h-2.5
                    rounded-full
                    ${genderDot(
                      data.spouse
                        .gender
                    )}
                  `}
                />

                <h3
                  className="
                    text-white
                    font-semibold
                    text-lg
                    leading-none
                  "
                >
                  {
                    data.spouse
                      .fullName
                  }
                </h3>
              </div>

              <div className="space-y-2">
                <div>
                  <p
                    className="
                      text-xs
                      uppercase
                      tracking-wide
                      text-zinc-500
                    "
                  >
                    Birth
                  </p>

                  <p className="text-zinc-200 text-sm">
                    {data.spouse
                      .birthDisplay ??
                      "Unknown"}
                  </p>
                </div>

                <p
                  className={`
                    text-sm
                    font-medium
                    ${statusColor(
                      data.spouse
                        .isAlive
                    )}
                  `}
                >
                  {data.spouse
                    .isAlive
                    ? "Living"
                    : "Deceased"}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      <Handle
        type="source"
        position={
          Position.Bottom
        }
        style={{
          opacity: 0,
        }}
      />
    </div>
  );
}