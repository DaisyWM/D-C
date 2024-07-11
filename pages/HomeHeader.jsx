import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function HomeHeader() {
    const { user } = useContext(UserContext);

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex justify-between items-center p-4 ">
      <Link to={"/home"} href="" className="flex items-center gap-1">
        <svg
          class="h-8 w-8 text-gray-800"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          {" "}
          <path stroke="none" d="M0 0h24v24H0z" />{" "}
          <path d="M8 9l5 5v7h-5v-4m0 4h-5v-7l5 -5m1 1v-6a1 1 0 0 1 1 -1h10a1 1 0 0 1 1 1v17h-8" />{" "}
          <line x1="13" y1="7" x2="13" y2="7.01" />{" "}
          <line x1="17" y1="7" x2="17" y2="7.01" />{" "}
          <line x1="17" y1="11" x2="17" y2="11.01" />{" "}
          <line x1="17" y1="15" x2="17" y2="15.01" />
        </svg>
        <span className="font-bold text-2xl">D&C</span>
      </Link>
        <nav className="space-x-4">
          <a href="/" className="text-gray-700">Home</a>
          <a href="/about" className="text-gray-700">About</a>
          <a href="/destinations" className="text-gray-700">Destinations</a>
        </nav>
        <Link
        to={user ? "/account" : "/login"}
        className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4"
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
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 relative top-1"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {!!user && <div>{user.name}</div>}
      </Link>
      </div>
    </header>
  );
}
