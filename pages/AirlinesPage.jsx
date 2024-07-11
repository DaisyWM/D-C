import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import Header from "../Header";

export default function AirlinesPage() {
  const [airline, setAirline] = useState([]);

  useEffect(() => {
    axios.get("/user-airline").then(({ data }) => {
      setAirline(data);
    });
  }, []);

  return (
    <>
      <Header />
      <div>
        <AccountNav />
        <div className="text-center">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
            to={"/account/airlines/new"}
          >
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new airline
          </Link>
        </div>
        <div className="mt-4">
          {airline.length > 0 &&
            airline.map((air) => (
              <Link
                to={"/account/airlines/" + air._id}
                className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl"
              >
                <div className="flex w-48 h-48 bg-gray-300 gow shrink-0">
                  <PlaceImg place={air} />
                </div>
                <div className="grow-0 shrink">
                  <h2 className="text-xl">{air.title}</h2>
                  <p className="text-sm mt-2">{air.description}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}
