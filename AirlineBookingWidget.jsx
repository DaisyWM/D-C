import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from 'date-fns';
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";


export default function AirlineBookingWidget({airline}) {

    const [checkIn, setCheckIn] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [passangers, setPassangers] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [redirect, setRedirect] = useState('');
    const {user} = useContext(UserContext);

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user]);

    let numberOfNights = 0;
    if(checkIn && returnDate) {
        numberOfNights = differenceInCalendarDays(new Date(returnDate), new Date(checkIn));
    }

    async function bookThisPlace() {
        const response = await axios.post('/airline-bookings', {
            checkIn,returnDate,passangers,name,phone,email,
            airline:airline._id,
            price:airline.price,
        });
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/airline/${bookingId}`);
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div className="bg-white shadow p-4 rounded-2xl">
                    <div className="text-2xl text-center mb-2">
                        Price: ${airline.price} / per trip
                    </div>
                    <div className="border rounded-2xl mt-4">
                        <div className="flex">
                            <div className="py-3 px-4">
                                <label>Depature:</label>
                                <input type='date' value={checkIn} onChange={ev => setCheckIn(ev.target.value)} />
                            </div>
                            <div className="py-3 px-4 border-l">
                                <label>Return:</label>
                                <input type='date' value={returnDate} onChange={ev => setReturnDate(ev.target.value)} />
                            </div>
                        </div>
                        <div className="py-3 px-4 border-t">
                            <label>Number of Passangers:</label>
                            <input type='number' value={passangers} onChange={ev => setPassangers(ev.target.value)} />
                        </div>
                            <div className="py-3 px-4 ">
                                <label>Your full name:</label>
                                <input type='text' value={name} onChange={ev => setName(ev.target.value)}/>
                                <label>Phone Number:</label>
                                <input type='tel' value={phone} onChange={ev => setPhone(ev.target.value)}/>
                                <label>Email:</label>
                                <input type='email' value={email} onChange={ev => setEmail(ev.target.value)}/>
                            </div>
                    </div>
                    <button onClick={bookThisPlace} className="primary mt-4">
                        Book now
                            <span> Ksh.{airline.price}</span>
                    </button>
                </div>
    );
}