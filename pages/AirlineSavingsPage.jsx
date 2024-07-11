import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SavedNav from "../SavedNav";
import Header from "../Header";

export default function AirlineSavingsPage() {
  const [airlines, setAirlines] = useState(null); // Initialize as null

  useEffect(() => {
    const fetchSavedAirlines = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/users-Savings-Airlines", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const savedData = response.data.map((savedAirline) => ({
          ...savedAirline,
          saved: savedAirline.saved,
        }));
        setAirlines(savedData);
      } catch (error) {
        console.error("Error fetching saved airlines:", error);
        setAirlines([]); // Set airlines to an empty array on error if desired
      }
    };

    fetchSavedAirlines();
  }, []);

  return (
    <>
      <Header />
      <div>
        <SavedNav />
        <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {airlines === null ? (
            <div className="mt-8 text-center text-gray-500">
              Loading...
            </div>
          ) : airlines.length === 0 ? (
            <div className="mt-10 text-center text-gray-700 font-bold text-2xl">
            No Airlines Saved yet.
          </div>
          ) : (
            airlines.map((savedAirline) => (
              <Link
                to={"/airline/" + savedAirline.airline._id}
                key={savedAirline._id}
              >
                <div className="bg-gray-500 mb-2 rounded-2xl flex">
                  {savedAirline.airline.photos?.[0] && (
                    <img
                      className="rounded-2xl object-cover aspect-square"
                      src={savedAirline.airline.photos[0]}
                      alt=""
                    />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <h2 className="font-bold">{savedAirline.airline.address}</h2>
                  {savedAirline.saved && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                      />
                    </svg>
                  )}
                </div>
                <h3 className="text-sm text-gray-500">
                  {savedAirline.airline.title}
                </h3>
                <div className="mt-1">
                  <span className="font-bold">
                    ${savedAirline.airline.price}
                  </span>{" "}
                  per trip
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
}
