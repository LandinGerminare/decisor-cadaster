import SideBarItem from "./SideBarItem";
import useAuth from "@/context/Auth";
import { MenuItem, menuOptions } from "@/utils/MenuOptions";
import { useEffect, useState } from "react";

interface SideBarProps {
  selectedMenu: MenuItem | null;
  onChangeMenu: (newMenu: MenuItem) => void;
}

export default function SideBar(props: SideBarProps) {
  const { clearCredentials } = useAuth();
  const [storedUsername, setStoredUsername] = useState<any>(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    setStoredUsername(username);
  }, []);

  return (
    <nav className="flex flex-col w-44 border-r-[1px] border-[#2A2C32]">
      <div className="h-24 flex flex-col justify-center items-center">
        <img src="/logo/decisor_logo.svg" className="h-9" />
      </div>
      <div className="flex flex-col flex-1 pt-2 pr-2 gap-4">
        {menuOptions.map((e) => {
          return (
            <SideBarItem
              key={e.name}
              isSelected={props.selectedMenu === e}
              onClick={() => props.onChangeMenu(e)}
              text={e.name}
            />
          );
        })}
        <div className="flex flex-col flex-1"></div>
        <SideBarItem
          isSelected={false}
          text="Sair"
          onClick={() => {
            clearCredentials();
            localStorage.setItem("modalOpened_frames", "false");
            localStorage.removeItem("lastBranchId");
          }}
        />
        <div className="h-4"></div>
      </div>
    </nav>
  );
}
