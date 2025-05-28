interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  subtitle?: string;
  children?: React.ReactNode;
  containerStyle?: string;
  inputStyle?: string;
  componentStyle?: string;
}

export default function Input({
  label,
  children,
  containerStyle,
  subtitle,
  inputStyle,
  componentStyle,
  ...props
}: InputProps) {
  return (
    <div className={`flex flex-col ${componentStyle || ""}`}>
      {(label || subtitle) && (
        <div className="flex items-center justify-between mb-1">
          {label && <p className="font-medium">{label}</p>}
          {(subtitle || props.required) && (
            <p className="text-[0.7rem] text-neutral-600">
              {props.required ? "Obrigatório" : subtitle}
            </p>
          )}
        </div>
      )}

      <div
        className={`
          border border-[#41454e]
          rounded-md h-16
          overflow-hidden flex items-center w-full 
          transition-colors duration-200 
          ${props.disabled ? "bg-neutral-200" : "bg-transparent"} 
          focus-within:border-[#833b0b]
          inputContainer 
          ${containerStyle || ""}
        `}
      >
        {children && <div className="pl-2">{children}</div>}

        <input
          className={`outline-none py-4 px-3 w-full bg-transparent ${inputStyle || ""}`}
          {...props}
        />
      </div>
    </div>
  );
}
