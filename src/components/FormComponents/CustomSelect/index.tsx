import { useState, useEffect, useRef } from "react";
import { ArrowFatLinesDown } from "phosphor-react";

interface Option {
  label: string;
  value: string | number;
}

interface SelectProps {
  options: Option[];
  value: Option | null;
  onChange: (value: Option) => void;
  placeholder?: string;
  componentStyle?: string;
  containerStyle?: string;
  label?: string;
  onInputChange?: (input: string) => void;
}

export default function CustomSelect({ options, value, onChange, placeholder, containerStyle, componentStyle, label, onInputChange }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const selectRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setFilteredOptions(
      options.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, options]);

  useEffect(() => {
    if (!isTyping) {
      if (value) {
        setSearch(value.label);
      } else {
        setSearch("");
      }
    }
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${componentStyle}`} ref={selectRef}>
      {label && <p className="font-medium mb-1">{label}</p>}

      <div
        className={`border-[1px] px-6 border-[#41454e] rounded-md h-11 monitor:h-16 inputContainer overflow-hidden focus-within:border-[#ee792b] flex items-center w-full transition-colors duration-200 ${containerStyle} bg-transparent`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsTyping(true);
            if (onInputChange) {
              onInputChange(e.target.value);
            }
          }}
          placeholder={placeholder || "Selecione..."}
          className="w-full outline-none bg-transparent"
        />
        <ArrowFatLinesDown className="w-4 h-4 text-gray-500" />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full border bg-[#dedfe3] border-[#dedfe3] rounded-lg mt-1 shadow-md max-h-96 overflow-auto scrollbar">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onChange(option);
                  setSearch(option.label);
                  setIsTyping(false);
                  setIsOpen(false);
                }}
                className="px-3 py-2 cursor-pointer hover:bg-neutral-100"
              >
                {option.label}
              </div>
            ))
          ) : (
            <p className="px-3 py-2 text-gray-500 text-sm">Nenhum resultado encontrado</p>
          )}
        </div>
      )}
    </div>
  );
}
