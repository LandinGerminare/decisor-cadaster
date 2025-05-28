import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface RadioToggleProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  checked?: boolean;
  onChange: () => void;
  containerStyle?: string;
}

export default function Checked({ label, checked, onChange, containerStyle, ...props }: RadioToggleProps) {
  return (
    <label className={`flex items-center cursor-pointer gap-2 ${containerStyle}`}>
      <input type="radio" className="sr-only" checked={checked} onChange={onChange} {...props} />
      <div
        className={`w-8 h-8 rounded-full border-2 border-[#41454e] flex items-center justify-center transition-all ${checked ? "bg-[#ee792b] border-[#ee792b] shadow-md shadow-[#ee792b]/50" : "bg-transparent"
          }`}
      />
      {label && <span className="text-white text-xl">{label}</span>}
    </label>
  );
}