import CadasterForm from "../CadasterForm";

export default function CadasterView() {
  return (
    <div className="flex flex-col gap-2 justify-center w-full">
      <div className="flex w-full justify-center">
        <CadasterForm />
      </div>
    </div>
  );
}
