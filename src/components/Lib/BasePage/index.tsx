import { ReactNode } from "react";

interface BasePageProps {
  header?: ReactNode;
  children: ReactNode;
  disabledPadding?: boolean;
}

export default function BasePage(props: BasePageProps) {
  return (
    <div className="h-full flex flex-col flex-1">
      {props.header}
      <div
        className={`bg-[#131417] overflow-x-hidden overflow-y-auto scrollbar flex flex-1 flex-col ${props.disabledPadding ? "" : "px-14 py-8"
          }`}
      >
        {props.children}
      </div>
    </div>
  );
}
