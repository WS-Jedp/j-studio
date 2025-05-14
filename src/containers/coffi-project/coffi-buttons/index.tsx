import { MouseEventHandler } from "react";

interface SimpleButtonProps {
  text: string;
  action: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  loading?: boolean;
  full?: boolean;
  shimmer?: boolean;
  id?: string;
}

export const CoffiSimpleButton: React.FC<SimpleButtonProps> = ({
  text,
  action,
  disabled = false,
  full = false,
}) => {
  return (
    <button
      disabled={disabled}
      className={`
            w-full ${!full ? "max-w-[240px]" : ""}
            flex items-center justify-center
            bg-gradient-to-r from-coffi-blue to-coffi-purple text-white rounded-lg py-[7px] px-6 shadow-md shadow-coffi-purple/30 
            hover:bg-coffi-blue-300 hover:shadow-md hover:shadow-coffi-purple/50 transition-all duration-500 ease-in-out
        `}
      onClick={!disabled ? action : () => {}}
    >
      <span className="font-semibold text-md">{text}</span>
    </button>
  );
};

export const CoffiSimpleDarkButton: React.FC<SimpleButtonProps> = ({
  text,
  action,
  full = false,
  shimmer = false,
  id,
  disabled,
}) => {
  return (
    <button
      id={id}
      className={`
            ${!full ? "max-w-[300px" : "w-full"}
            bg-coffi-purple text-coffi-white rounded-lg py-[6px] px-6 
             transition-all duration-500 ease-in-out
            ${
              !disabled
                ? shimmer
                  ? "relative overflow-hidden shadow-coffi-purple-300 hover:shadow-lg hover:bg-coffi-purple/60"
                  : " hover:bg-coffi-purple/90"
                : "relative cursor-not-allowed overflow-hidden opacity-60"
            }
          `}
      onClick={!disabled ? action : () => {}}
      disabled={disabled}
    >
      <span className="font-semibold text-md relative z-10">{text}</span>
      {shimmer && (
        <span className="absolute inset-0 w-full h-full">
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shimmer-animation"></span>
        </span>
      )}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .shimmer-animation {
          animation: shimmer 6s infinite;
        }
      `}</style>
    </button>
  );
};
