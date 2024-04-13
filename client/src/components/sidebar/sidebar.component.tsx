import Image from "next/image";

export function Sidebar() {
  return (
    <div className="w-40 bg-[#e9e8e8] rounded-tl-md rounded-bl-md shadow-md">
      <div id="logo" className="flex items-center justify-center gap-2 text-xl px-2 pt-4">
        <Image src="/logo.png" alt="Plan Agro Logo" width={20} height={0} />
        <span>
          Plan<b>Agro</b>
        </span>
      </div>
    </div>
  );
}
