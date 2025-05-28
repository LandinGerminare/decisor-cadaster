import Image from "next/image";
import Jojo from "../../../../public/images/jojo.png"

interface IProps {
  title: string;
}

export default function EmptyHeader(props: IProps) {
  return (
    <header
      className={`flex items-center w-full px-10 h-20 bg-[#1e2024] overflow-hidden border-b-[1px] border-[#2A2C32] gap-4`}
    >
      <Image
        src={Jojo}
        alt="Jojo"
        height={32}
        width={32}
        className="rounded-full border-neutral-300 border-[1px] bg-neutral-1000"
      />
      <p className="text-neutral-1000 text-xl leading-none">
        {props.title}
      </p>
    </header>
  );
}
