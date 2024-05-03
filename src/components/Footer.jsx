import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col w-full bg-[#12073d] py-4 items-center justify-center text-white">
      <h1 className="text-[20px] font-semibold">Powered By <span className="underline"><a href="https://taiwo-personal-portfolio.netlify.app/">Taiwo Onileowo</a></span></h1>
      <div className="flex gap-4 mt-2 text-[14px]">
        <p className="underline cursor-pointer">
          <a href="mailto:taiwoonileowo17@gmail.com" className="link-url"></a>
          Say thanks
        </p>
        <p className="underline cursor-pointer">
          <a href="mailto:taiwoonileowo17@gmail.com" className=" "></a>
          How can we improve?
        </p>
      </div>
    </footer>
  );
};

export default Footer;
