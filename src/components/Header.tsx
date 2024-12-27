import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Header = ({ withSpacer = true }: { withSpacer?: boolean }) => {
  return (
    <>
      <header className="bg-white fixed top-0 left-0 w-full shadow-md z-10">
        <div className="container mx-auto p-4 flex flex-col md:flex-row items-center md:justify-between gap-4">
          <div className="flex justify-center md:justify-start">
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

          <div className="w-full md:w-auto">
            <SearchBar />
          </div>
        </div>
      </header>
      {withSpacer && <div className="h-24"></div>}
    </>
  );
};

export default Header;
