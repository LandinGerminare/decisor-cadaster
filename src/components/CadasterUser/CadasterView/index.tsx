import CadasterForm from "../CadasterForm";
import CadasterHeader from "../CadasterHeader";

export default function CadasterView() {
  return (
    <div className="flex flex-col gap-2 justify-center w-full">
      <CadasterHeader />
      <div className="flex w-full justify-center">
        <CadasterForm />
      </div>
    </div>
  )
}