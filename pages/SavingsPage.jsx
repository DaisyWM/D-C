import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SavedNav from "../SavedNav";
import Header from "../Header";

export default function SavingsPage() {
  const [places, setPlaces] = useState([]);
  const [airlines, setAirlines] = useState([]);

  useEffect(() => {
    const fetchSavedItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [placesResponse, airlinesResponse] = await Promise.all([
          axios.get("/users-Savings", { headers }),
          axios.get("/users-Savings-Airlines", { headers }),
        ]);

        setPlaces(placesResponse.data);
        setAirlines(airlinesResponse.data);
      } catch (error) {
        console.error("Error fetching saved items:", error);
      }
    };

    fetchSavedItems();
  }, []);

  return (
    <>
      <Header />
      <div>
        <SavedNav />
        {places.length === 0 && airlines.length === 0 ? (
          <div className="mt-10 text-center text-gray-700 font-extrabold text-4xl">
            No savings yet.
          </div>
        ) : (
          <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[...places, ...airlines].map((savedItem) => (
              <Link
                to={
                  savedItem.place
                    ? `/place/${savedItem.place._id}`
                    : `/airline/${savedItem.airline._id}`
                }
                key={savedItem._id}
              >
                <div className="bg-gray-500 mb-2 rounded-2xl flex">
                  <img
                    className="rounded-2xl object-cover aspect-square"
                    src={
                      savedItem.place?.photos?.[0] ||
                      savedItem.airline?.photos?.[0]
                    }
                    alt=""
                  />
                </div>
                <div className="flex items-center justify-between">
                  <h2 className="font-bold">
                    {savedItem.place?.address || savedItem.airline?.address}
                  </h2>
                  {savedItem.place ? (
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
                  ) : (
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
                  )}
                </div>
                <h3 className="text-sm text-gray-500">
                  {savedItem.place?.title || savedItem.airline?.title}
                </h3>
                <div className="mt-1 flex items-center justify-between">
                  <span className="font-bold">
                    ${savedItem.place?.price || savedItem.airline?.price}{" "}
                    <span className="font-normal">
                      per {savedItem.place ? "night" : "trip"}
                    </span>
                  </span>{" "}
                  {savedItem.place ? (
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
                  ) : (
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
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
