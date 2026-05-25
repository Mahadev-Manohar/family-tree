import {
  Handle,
  Position,
} from "reactflow";

type Props = {
  id: string;

  data: {
    fullName: string;
    gender?: string;
    isAlive?: boolean;

    profileImageUrl?:
    | string
    | null;

    birthDisplay?:
      | string
      | null;

    onPersonClick?: (
      id: string
    ) => void;

    spouse?: {
      id: string;
      fullName: string;
      gender?: string;
      isAlive?: boolean;

      profileImageUrl?:
        | string
        | null;

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
  id,
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
        px-6
        py-5
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
        <div
          className="
            flex-1
            cursor-pointer
            rounded-xl
            p-2
            transition
            hover:bg-zinc-900
          "
          onClick={(e) => {
            e.stopPropagation();

            data.onPersonClick?.(
              id
            );
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            {data.profileImageUrl ? (
              <img
                src={
                  data.profileImageUrl
                }
                alt={
                  data.fullName
                }
                className="
                  w-12
                  h-12
                  rounded-full
                  object-cover
                  border
                  border-zinc-700
                "
              />
            ) : (
              <div
                className={`
                  w-12
                  h-12
                  rounded-full
                  flex
                  items-center
                  justify-center
                  text-xs
                  font-semibold
                  text-white
                  ${genderDot(
                    data.gender
                  )}
                `}
              >
                {data.fullName
                  .split(" ")
                  .map((name) =>
                    name[0]
                  )
                  .slice(0, 2)
                  .join("")}
              </div>
            )}

            <h3
              className="
                text-white
                font-semibold
                text-base
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
            <div
              className="
                flex-1
                cursor-pointer
                rounded-xl
                p-2
                transition
                hover:bg-zinc-900
              "
              onClick={(e) => {
                e.stopPropagation();

                data.onPersonClick?.(
                  data.spouse!.id
                );
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                {data.spouse
                  ?.profileImageUrl ? (
                  <img
                    src={
                      data.spouse
                        .profileImageUrl
                    }
                    alt={
                      data.spouse
                        .fullName
                    }
                    className="
                      w-12
                      h-12
                      rounded-full
                      object-cover
                      border
                      border-zinc-700
                    "
                  />
                ) : (
                  <div
                    className={`
                      w-12
                      h-12
                      rounded-full
                      flex
                      items-center
                      justify-center
                      text-xs
                      font-semibold
                      text-white
                      ${genderDot(
                        data.spouse
                          ?.gender
                      )}
                    `}
                  >
                    {data.spouse?.fullName
                      .split(" ")
                      .map((name) =>
                        name[0]
                      )
                      .slice(0, 2)
                      .join("")}
                  </div>
                )}

                <h3
                  className="
                    text-white
                    font-semibold
                    text-base
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