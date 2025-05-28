interface SelectProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  label?: string;
  children: React.ReactNode;
  containerStyle?: string;
  subtitle?: string;
  componentStyle?: string;
}

const Select = ({
  label,
  children,
  containerStyle,
  subtitle,
  componentStyle,
  ...props
}: SelectProps) => {
  return (
    <div className={`flex flex-col ${componentStyle}`}>
      <div className="flex items-center justify-between mb-1">
        {label && <p className="text-sm">{label}</p>}
        {subtitle && (
          <p className="text-[0.7rem] text-neutral-600">{subtitle}</p>
        )}
      </div>

      <div
        className={`border-[1px] border-neutral-300 rounded-base h-11 monitor:h-16 inputContainer overflow-hidden focus-within:border-primary-900 flex items-center w-full transition-colors duration-200 ${containerStyle} ${props.disabled ? "bg-neutral-200" : "bg-transparent"
          }`}
      >
        <select
          className="outline-none p-2 w-full scrollbar bg-transparent"
          disabled={props.disabled}
          {...props}
        >
          {children}
        </select>
      </div>
    </div>
  );
};

export default Select;
