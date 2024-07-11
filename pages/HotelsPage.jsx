import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Image from "../Image";
import Header from "../Header";

export default function HotelsPage() {
  const [places, setPlaces] = useState([]);
  const [search, setSearch] = useState("");

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    axios.get("/places").then((response) => {
      const shuffledHotels = shuffleArray(response.data);
      setPlaces(shuffledHotels);
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
              placeholder="Search for countries, hotels, prices..."
              onChange={(ev) => setSearch(ev.target.value)}
            />
          </div>
        </div>
        <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {places.length > 0 &&
            places
              .filter((item) => {
                const searchTerm = search.toLocaleLowerCase();
                return searchTerm === "not available"
                  ? item
                  : item.title.toLowerCase().includes(searchTerm) ||
                      item.address.toLowerCase().includes(searchTerm) ||
                      item.price.toString().includes(searchTerm);
              })
              .map((place) => (
                <Link to={"/place/" + place._id}>
                  <div className="bg-gray-500 mb-2 rounded-2xl flex">
                    {place.photos?.[0] && (
                      <Image
                        className="rounded-2xl object-cover aspect-square"
                        src={place.photos?.[0]}
                        alt=""
                      />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold">{place.address}</h2>
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
                        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                  </div>
                  <h3 className="text-md text-gray-700">{place.title}</h3>
                  <div className="mt-1">
                    <span className="font-bold">${place.price}</span> per night
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </>
  );
}
