import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  MouseEvent,
  MouseEventHandler,
} from "react";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  title?: string;
  loading?: boolean;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  containerStyle?: React.HTMLAttributes<HTMLButtonElement> | string;
  imageSrc?: string;
}

export default function Button({
  title,
  children,
  containerStyle,
  loading = false,
  size = "medium",
  disabled = false,
  onClick,
  imageSrc,
  ...props
}: ButtonProps) {
  const style =
    "border-[#ee792b] text-[#ee792b] hover:border-[#f4ab7b] hover:text-[#f4ab7b] active:border-[#bd550f] active:text-[#bd550f]";

  const sizeStyle =
    size === "small"
      ? "p-2 text-sm "
      : size === "large"
        ? "p-3 text-lg "
        : "p-[10px] text-md ";

  const disabledStyle = disabled
    ? "cursor-not-allowed !text-[#dedfe3] !border-[#41454e] !bg-transparent !hover:border-[#f4ab7b] hover:text-[#f4ab7b] "
    : "";
  return (
    <button
      onClick={(e) => {
        if (loading) return;
        if (onClick) onClick(e);
      }}
      className={`flex items-center justify-center rounded-md gap-3 transition-all text-center border-[1px] border-[#833b0b] hover:border-[#97440c] active:border-button-1000 cursor-pointer ${style} ${sizeStyle} ${disabledStyle} ${containerStyle}`}
      {...props}
    >
      {loading ? "Carregando..." : (
        <>
          {imageSrc && <img src={imageSrc} className="w-[18px] h-[20px]" />}
          {title && <p>{title}</p>}
          {children}
        </>
      )}
    </button>
  );
}
