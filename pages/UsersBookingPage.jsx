import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import BookingDates from "../BookingDates";
import Header from "../Header";

export default function UsersBookingPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/users-Booking").then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    <>
    <Header />
      <div>
        <AccountNav />
        <div>
          {users?.length > 0 &&
            users
              .slice()
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((booking) => (
                <div
                  className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden my-4"
                  key={booking._id}
                >
                  <div className="w-72">
                    <PlaceImg place={booking.place} />
                  </div>
                  <div className="py-2 pr-3 grow">
                    <h2 className="text-xl font-semibold underline">
                      {booking.place.title}
                    </h2>
                    <h2 className="text-xl">Name: {booking.name}</h2>
                    <h2 className="text-xl">Phone: {booking.phone}</h2>
                    <div className="text-xl mt-1">
                      <BookingDates
                        booking={booking}
                        className="mb-2 mt-4 text-gray-500"
                      />
                      <div className="flex gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-8 h-8"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                          />
                        </svg>
                        <span className="text-2xl">
                          Total Price: ${booking.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
}
