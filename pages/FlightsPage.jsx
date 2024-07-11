import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Image from "../Image";
import Header from "../Header";

export default function FlightsPage() {
  const [airlines, setAirlines] = useState([]);
  const [search, setSearch] = useState("");

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    axios.get("/airline").then((response) => {
      const shuffledPlanes = shuffleArray(response.data);
      setAirlines(shuffledPlanes);
    });
  }, []);

  return (
    <>
      <Header />
      <div>
        <div className="flex justify-center items-center my-4">
          <div className="flex w-full max-w-lg gap-2">
            <input
              type="text"
              className="w-48 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Search for countries, flights, prices..."
              onChange={(ev) => setSearch(ev.target.value)}
            />
          </div>
        </div>
        <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {airlines.length > 0 &&
            airlines
              .filter((item) => {
                const searchTerm = search.toLocaleLowerCase();
                return searchTerm === "not available"
                  ? item
                  : item.title.toLowerCase().includes(searchTerm) ||
                      item.address.toLowerCase().includes(searchTerm) ||
                      item.price.toString().includes(searchTerm);
              })
              .map((air) => (
                <Link to={"/airline/" + air._id}>
                  <div className="bg-gray-500 mb-2 rounded-2xl flex">
                    {air.photos?.[0] && (
                      <Image
                        className="rounded-2xl object-cover aspect-square"
                        src={air.photos?.[0]}
                        alt=""
                      />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold">{air.address}</h2>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                      />
                    </svg>
                  </div>
                  <h3 className="text-md text-gray-700">{air.title}</h3>
                  <div className="mt-1">
                    <span className="font-bold">${air.price}</span> per trip
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </>
  );
}
