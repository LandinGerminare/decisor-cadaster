import Select from "react-select";

interface SelectInputProps {
  label?: string;
  subtitle?: string;
  required?: boolean;
  className?: string;
  containerStyle?: string;
  componentStyle?: string;
  styles?: any;
  value: any;
  onChange: (value: any) => void;
  options: { label: string; value: any }[];
  placeholder?: string;
  isSearchable?: boolean;
  isDisabled?: boolean;
}

export default function SelectInput({
  label,
  subtitle,
  required,
  className,
  componentStyle,
  containerStyle,
  styles,
  ...props
}: SelectInputProps) {
  return (
    <div className={`flex flex-col ${componentStyle ?? ""}`}>
      {(label || subtitle) && (
        <div className="flex items-center justify-between mb-1">
          {label && <p className="font-medium">{label}</p>}
          {(required || subtitle) && (
            <p className="text-[0.7rem] text-neutral-600">
              {required ? "Obrigatório" : subtitle}
            </p>
          )}
        </div>
      )}

      <div
        className={`border-[1px] border-neutral-300 rounded-base inputContainer transition-colors duration-200 h-11 monitor:h-16 overflow-hidden ${containerStyle} ${props.isDisabled ? "bg-neutral-200" : "bg-transparent"}`}
      >
        <Select
          {...props}
          className={`w-full ${className ?? ""}`}
          styles={styles}
        />
      </div>
    </div>
  );
}
