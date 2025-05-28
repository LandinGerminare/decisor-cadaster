interface SideBarItemProps {
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function SideBarItem(props: SideBarItemProps) {
  return (
    <div
      onClick={() => props.onClick()}
      className={`p-3 cursor-pointer flex flex-row items-center h-12 bg-[#2a2c32] hover:bg-[#41454e] rounded-r-md ${props.isSelected
        ? "bg-[#e26612] hover:bg-[#bd550f] font-bold text-neutral-1000"
        : ""
        }`}
    >
      {props.text}
    </div>
  );
}
