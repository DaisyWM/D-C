import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import { format } from "date-fns";

export default function BookingPage() {

    const {id} = useParams();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        if (id) {
            axios.get('/airline-bookings').then(response => {
                const foundBooking = response.data.find(({_id}) => _id === id);
                if (foundBooking) {
                    setBooking(foundBooking);
                    console.log(foundBooking)
                }
            })
        }
    }, [id]);

    if (!booking) {
        return <div>Loading...</div>;
    }

    const date = format(new Date(booking.checkIn), 'yyyy-MM-dd');

    return (
        <div className="my-8">
            <h1 className="text-3xl">{booking.airline.title}</h1>
            <AddressLink className='my-2 block'>{booking.airline.address}</AddressLink>
            <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
                <div>
                    <h2 className="text-2xl mb-4">Your booking information:</h2>
                    <p className="text-xl">Booking ID: {booking._id}</p>
                    <p className="text-xl">Depature Date: {date}</p><br />
                    <p><span className="font-bold">NB: </span>Payment will be done at Check In. Please present booking id for payment.</p>
                </div>
                <div className="bg-primary p-6 text-white rounded-2xl">
                    <div>Total Price</div>
                    <div className="text-3xl">${booking.price}</div>
                </div>
            </div>
            <PlaceGallery place={booking.airline} />
        </div>
    )
}