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

function genderColor(
  gender?: string
) {
  switch (gender) {
    case "MALE":
      return "bg-blue-500";

    case "FEMALE":
      return "bg-pink-500";

    default:
      return "bg-zinc-500";
  }
}

export default function PersonNode({
  data,
}: Props) {
  return (
    <div
      className="
        relative
        min-w-[320px]
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-950
        p-5
        shadow-2xl
        transition-all
        duration-300
        hover:scale-[1.02]
        hover:border-zinc-700
      "
    >
      <Handle
        type="target"
        position={
          Position.Top
        }
        style={{
          opacity: 0,
        }}
      />

      <div
        className="
          flex
          items-start
          justify-between
          gap-6
        "
      >
        {/* Main person */}
        <div className="flex-1">
          <div
            className="
              flex
              items-center
              gap-2
              mb-2
            "
          >
            <div
              className={`
                w-3
                h-3
                rounded-full
                ${genderColor(
                  data.gender
                )}
              `}
            />

            <h3
              className="
                text-white
                text-xl
                font-bold
              "
            >
              {data.fullName}
            </h3>
          </div>

          <p
            className="
              text-zinc-400
              text-sm
            "
          >
            Born:
            {" "}
            {data.birthDisplay ??
              "Unknown"}
          </p>

          <p
            className={`
              text-sm mt-1
              ${
                data.isAlive
                  ? "text-emerald-400"
                  : "text-red-400"
              }
            `}
          >
            {data.isAlive
              ? "Alive"
              : "Deceased"}
          </p>
        </div>

        {/* spouse */}
        {data.spouse && (
          <>
            <div
              className="
                w-px
                self-stretch
                bg-zinc-800
              "
            />

            <div className="flex-1">
              <div
                className="
                  flex
                  items-center
                  gap-2
                  mb-2
                "
              >
                <div
                  className={`
                    w-3
                    h-3
                    rounded-full
                    ${genderColor(
                      data.spouse
                        .gender
                    )}
                  `}
                />

                <h3
                  className="
                    text-sky-400
                    text-xl
                    font-bold
                  "
                >
                  {
                    data.spouse
                      .fullName
                  }
                </h3>
              </div>

              <p
                className="
                  text-zinc-400
                  text-sm
                "
              >
                Born:
                {" "}
                {data.spouse
                  .birthDisplay ??
                  "Unknown"}
              </p>

              <p
                className={`
                  text-sm mt-1
                  ${
                    data.spouse
                      .isAlive
                      ? "text-emerald-400"
                      : "text-red-400"
                  }
                `}
              >
                {data.spouse
                  .isAlive
                  ? "Alive"
                  : "Deceased"}
              </p>
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