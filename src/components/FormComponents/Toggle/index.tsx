import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface ToggleProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  containerStyle?: string;
}

export default function Toggle({ label, containerStyle, ...props }: ToggleProps) {
  return (
    <label className={`inline-flex items-center cursor-pointer ${containerStyle}`}>
      <input type="checkbox" className="sr-only peer" {...props} />
      <div className="relative w-11 h-6 bg-[#41454e] rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-700 mr-2"></div>
      {label && <span className="font-medium">{label}</span>}
    </label>
  );
}
