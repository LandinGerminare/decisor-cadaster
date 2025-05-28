import { ReactNode, useEffect, useState } from "react";
import useAuth from "@/context/Auth";
import { useRouter } from "next/router";
import SideBar from "./SideBar";
import { MenuItem, menuOptions } from "@/utils/MenuOptions";

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { getAccessToken } = useAuth();

  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);

  useEffect(() => {
    const currentMainRoute = router.pathname.split("/")[1];

    if (getAccessToken() === null) {
      router.push({
        pathname: "/",
        query: currentMainRoute
          ? {
            from: currentMainRoute,
          }
          : {},
      });
      return;
    }

    if (!currentMainRoute) return;
    if (currentMainRoute === "404") return;

    const filteredMenuByRoute = menuOptions.filter(
      (e) => e.route.replace("/", "") === currentMainRoute
    );
    if (filteredMenuByRoute.length !== 0) {
      setSelectedMenu(filteredMenuByRoute[0]);
    }
  }, [router.pathname]);

  return (
    <div className="h-screen w-screen flex flex-row overflow-hidden bg-[#1e2024]">
      <SideBar
        selectedMenu={selectedMenu}
        onChangeMenu={(newMenu) => {
          setSelectedMenu(newMenu);
          router.push(newMenu.route);
        }}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 h-full bg-[#131417] flex flex-col gap-4 relative">
          {renderContent(children)}
        </div>
      </div>
    </div>
  );

  function renderContent(children: ReactNode) {
    return children;
  }
}
