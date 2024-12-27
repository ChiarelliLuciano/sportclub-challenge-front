import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getByValue } from "../services/api";

type Suggestion = {
  id: number;
  comercio: string;
  descuento: number;
  Imagens: { url: string }[];
};

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.trim() === "") {
        setSuggestions([]);
        return;
      }

      try {
        const results = await getByValue(searchTerm);
        setSuggestions(results?.body?.beneficios || []);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    };

    const delayDebounceFn = setTimeout(fetchSuggestions, 300); // Delay for debounce
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSelectSuggestion = (id: number) => {
    setSearchTerm("");
    setSuggestions([]);
    navigate(`/beneficio/${id}`);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSuggestions([]);
  };

  return (
    <div className="md:min-w-[380px] relative">
      <div className="relative flex w-full">
        <div className="flex min-h-[40px] w-full md:py-3 items-center overflow-hidden rounded-full border-[3px] md:border-[4px] border-yellow-400 text-sm md:text-lg text-gray-900 focus:outline-none relative">
          <input
            autoComplete="off"
            id="search-navbar"
            placeholder="Buscar beneficio"
            type="text"
            className="h-full w-full pl-8 pr-10 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-4 text-black"
            >
              ✖
            </button>
          )}
        </div>
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white shadow-md rounded-md max-h-60 overflow-auto z-20">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => handleSelectSuggestion(suggestion.id)}
              className="flex items-center gap-4 p-2 hover:bg-yellow-200 cursor-pointer"
            >
              <img
                src={suggestion.Imagens?.[0]?.url}
                alt={suggestion.comercio}
                className="w-12 h-12 rounded-full object-cover"
              />

              <div>
                <p className="font-medium text-black">{suggestion.comercio}</p>
                <p className="text-sm text-gray-500">
                  {suggestion.descuento}% de descuento
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
