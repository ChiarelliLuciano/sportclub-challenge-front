import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Header = ({ withSpacer = true }: { withSpacer?: boolean }) => {
  return (
    <>
      <header className="bg-white fixed top-0 left-0 w-full shadow-md z-10">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center">
            <Link to="/beneficios">
              <img
                src={logo}
                alt="sport-club"
                className="h-10 md:h-20 w-auto"
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              />
            </Link>
          </div>

          <div className="md:min-w-[380px]">
            <div className="relative flex w-full">
              <div className="flex min-h-[40px] w-full sm:py-3 items-center overflow-hidden rounded-full border-[2px] sm:border-[4px] border-yellow-400 text-sm sm:text-lg text-gray-900 focus:outline-none">
                <input
                  autoComplete="off"
                  id="search-navbar"
                  placeholder="Buscar beneficio"
                  type="text"
                  className="h-full w-full pl-8 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      {withSpacer && <div className="h-24"></div>}
    </>
  );
};

export default Header;
