import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import AirlineBookingWidget from "../AirlineBookingWidget";
import { UserContext } from "../UserContext";
import { toast } from "react-hot-toast";
import Header from "../Header";

const RatingStars = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      if (i < rating) {
        stars.push(
          <svg
            key={i}
            className="h-5 w-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        );
      } else {
        stars.push(
          <svg
            key={i}
            className="h-5 w-5 text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        );
      }
    }
  }
  return <div className="flex">{stars}</div>;
};

export default function AirlinePage() {
  const { id } = useParams();
  const [airline, setAirline] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [savedId, setSavedId] = useState("");
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewsExpanded, setReviewsExpanded] = useState(false);
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/airline/${id}`).then((response) => {
      setAirline(response.data);
      checkSavedStatus(response.data._id);
      fetchReviews(response.data._id);
    });
  }, [id]);

  const checkSavedStatus = async (airlineId) => {
    try {
      const response = await axios.get("/savedAirlines");
      const savedAirlines = response.data;
      const savedAirline = savedAirlines.find(
        (saved) => saved.airline._id === airlineId
      );
      if (savedAirline) {
        setIsSaved(true);
        setSavedId(savedAirline._id);
      }
    } catch (error) {
      console.error("Failed to fetch saved airlines", error);
    }
  };

  const fetchReviews = async (airlineId) => {
    try {
      const response = await axios.get(`/reviewsAirlines/${airlineId}`);
      setReviews(response.data);
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    }
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/reviewsAirlines", {
        airlineId: airline._id,
        content: newReview,
        rating: rating,
      });
      if (response.status === 201) {
        setReviews([...reviews, response.data]);
        setNewReview("");
        setRating(0);
        toast.success("Review submitted successfully!");
      }
    } catch (error) {
      console.error("Failed to submit review", error);
      toast.error("Failed to submit review.");
    }
  };

  async function toggleSaveAirline() {
    if (isSaved) {
      await deleteSavedAirline();
    } else {
      await saveAirline();
    }
  }

  async function saveAirline() {
    try {
      const response = await axios.post("/savedAirlines", {
        airline: airline._id,
      });
      if (response.status === 200) {
        setIsSaved(true);
        toast.success("Airline saved successfully!");
        setSavedId(response.data._id);
      } else {
        toast.error("Failed to save airline.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save airline.");
    }
  }

  async function deleteSavedAirline() {
    try {
      const response = await axios.delete(`/deleteSavedAirlines/${savedId}`);
      if (response.status === 200) {
        setIsSaved(false);
        toast.success("Airline removed from saved airlines.");
      } else {
        toast.error("Failed to remove airline from saved airlines.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove airline from saved airlines.");
    }
  }

  const toggleReviewsExpansion = () => {
    setReviewsExpanded(!reviewsExpanded);
  };

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  if (!airline) {
    return "Loading...";
  }

  return (
    <>
      <Header />
      <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
        <h1 className="text-3xl">{airline.title}</h1>
        <AddressLink>{airline.address}</AddressLink>
        <PlaceGallery place={airline} />
        <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
          <div>
            <div className="my-4">
              <h2 className="font-semibold text-2xl">Description</h2>
              {airline.description}
            </div>
            <span className="font-semibld">Check-in: {airline.checkIn}:00</span>
            <br />
            <span className="font-semibld">
              Boarding: {airline.boarding}:00
              <br />
            </span>

            <div className="max-w-24">
              <button
                onClick={toggleSaveAirline}
                className="primary my-3 mr-9 w-12 py-1 px-2 flex items-center justify-center"
              >
                {isSaved ? (
                  <>
                    <span>Saved</span>
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
                  </>
                ) : (
                  <>
                    <span>Save</span>
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
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
            <div className="mt-8">
              <h2 className="font-semibold text-2xl">Reviews</h2>
              {reviews
                .slice(0, reviewsExpanded ? reviews.length : 3)
                .map((review) => (
                  <div key={review._id} className="my-4 p-4 border rounded">
                    <p>
                      <strong>{review?.user?.name}</strong> -{" "}
                      {new Date(review?.createdAt).toLocaleDateString()}
                    </p>
                    <p>{review?.content}</p>
                    <RatingStars rating={review?.rating} />
                  </div>
                ))}
              {reviews.length > 3 && (
                <button
                  onClick={toggleReviewsExpansion}
                  className="bg-transparent "
                >
                  {reviewsExpanded ? (
                    <svg
                      className="h-8 w-8 text-gray-800"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-8 w-8 text-gray-800"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
                      />
                    </svg>
                  )}
                </button>
              )}
              <form onSubmit={handleReviewSubmit} className="mt-4">
                <textarea
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  placeholder="Write your review here..."
                  className="w-full p-2 border rounded"
                  required
                />
                <h4>Please rate before submitting.</h4>
                <div className="flex items-center">
                  <span className="mr-2">Rate: </span>
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`h-5 w-5 cursor-pointer ${
                        index < rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                      fill={index < rating ? "currentColor" : "none"}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      onClick={() => setRating(index + 1)}
                      onMouseEnter={() => setHoverRating(index + 1)}
                      onMouseLeave={() => setHoverRating(rating)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  ))}
                </div>

                <button type="submit" className="primary mt-2">
                  Submit Review
                </button>
              </form>
            </div>
          </div>
          <div>
            <AirlineBookingWidget airline={airline} />
          </div>
        </div>
        <div className="bg-white -mx-8 px-8 py-8 border-t">
          <div>
            <h2 className="font-semibold text-2xl">Extra Info:</h2>
          </div>
          <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
            {airline.extraInfo}
          </div>
        </div>
      </div>
    </>
  );
}
