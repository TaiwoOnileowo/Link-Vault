
import icon from "/icon.png";
const Footer = () => {
  return (
    <>
      <footer className="absolute bottom-0  flex flex-col w-full pt-4 items-center justify-center bg-lightGray dark:bg-dark dark:text-white">
        <div className="flex gap-2 mb-2 items-center">
          <img src={icon} alt="" className="w-6 h-6"/>
          <h1 className="font-bold text-darkGray dark:text-white text-sm">Link Vault</h1>
        </div>
        <div className="flex gap-4 text-xs">
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
        <div className="w-full text-[10px] pb-1 mt-4 flex justify-between items-center px-4">
        <h1 >
          Meet the developer:{" "}
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
          <p className="underline">Privacy Policy</p>
        </div>
        
      </footer>
    </>
  );
};

export default Footer;
