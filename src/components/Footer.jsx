import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col w-full bg-[#12073d] py-4 items-center justify-center text-white">
      <div className="flex gap-4 text-lg">
        <p className="underline cursor-pointer">
          <a
            href="mailto:taiwoonileowo17@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Say thanks
          </a>
        </p>
        <p className="underline cursor-pointer">
          <a
            href="mailto:taiwoonileowo17@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            How can we improve?
          </a>
        </p>
      </div>
      <h1 className="text-xs mt-[10px]">
        Powered By{" "}
        <span className="underline">
          <a
            href="https://taiwo-personal-portfolio.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Taiwo Onileowo
          </a>
        </span>
      </h1>
    </footer>
  );
};

export default Footer;
