export default function SearchComponent() {
  return (
    <div className="flex justify-center items-center my-4">
      <div className="flex w-full max-w-lg gap-2">
        <input
          type="text"
          className="w-48 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Search..."
        />
        <button className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primaryDark">
          Search
        </button>
      </div>
    </div>
  );
}
