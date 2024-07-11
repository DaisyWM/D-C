import { useEffect, useState } from "react";
import axios from "axios";
import Perks from "../Perks";
import PhotosUploader from "../PhotosUploader";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import AirPerks from "../AirPerks";
import Header from "../Header";

export default function AirlinesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [boarding, setBoarding] = useState("");
  const [passangers, setPassangers] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/airline/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setContact(data.contact);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setBoarding(data.boarding);
      setPassangers(data.passangers);
      setPrice(data.price);
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(ev) {
    ev.preventDefault();
    const airData = {
      title,
      address,
      contact,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      boarding,
      passangers,
      price,
    };
    if (id) {
      //update
      await axios.put("/airline", {
        id,
        ...airData,
      });
      setRedirect(true);
    } else {
      //add a new place
      await axios.post("/airline", airData);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/airlines"} />;
  }

  return (
    <>
    <Header />
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput("Title:", "Make it short and sweet!")}
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="Title, for example: The Great Airline"
        />
        {preInput("Address:", "Exact Location of this Airline.")}
        <input
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          placeholder="addresss"
        />
        {preInput("Contact:", "You mobile number.")}
        <input
          type="text"
          value={contact}
          onChange={(ev) => setContact(ev.target.value)}
          placeholder="contact"
        />
        {preInput("Photos:", "Quality photos of the place. More = Better")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput("Description:", "Description of the place")}
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        {preInput("Perks:", "Select all place perks")}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <AirPerks selected={perks} onChange={setPerks} />
        </div>
        {preInput("Extra Info:", "Add any extra info such as rules, etc.")}
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        />
        {preInput(
          "Check In & Out Times:",
          "Add checkin and checkout times. Remember to have some cleaning time allocated before guests arrive."
        )}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Check In Time</h3>
            <input
              type="text"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              placeholder="14"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Boarding Time</h3>
            <input
              type="text"
              value={boarding}
              onChange={(ev) => setBoarding(ev.target.value)}
              placeholder="11"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of Passangers</h3>
            <input
              type="number"
              value={passangers}
              onChange={(ev) => setPassangers(ev.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price Per Trip</h3>
            <input
              type="number"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
            />
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
    </>
  );
}
