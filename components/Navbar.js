import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="flex md:justify-center justify-between items-center p-4 gradient-bg-welcome">
      <div className="flex md:flex-[0.5] flex-initial justify-start text-gradient">
        <a href={"/"}>
          <Image src="/images/nav.jpg" width={70} height={70} alt="logo" className="w-32 cursor-pointer rounded-lg" />
        </a>
      </div>
      <div className="flex justify-between text-gray-900">
        <a href={"/"}>
          <Image src="/images/icon.png" width={200} height={64} alt="logo" className="w-32 cursor-pointer" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
