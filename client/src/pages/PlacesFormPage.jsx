import AccountNav from "../AccountNav";
import { Navigate } from "react-router-dom";

export default function PlacesFormPage() {

    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }

    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }

    function preInput(header,description) {
        return (
            <>
              {inputHeader(header)}
              {inputDescription(description)}
            </>
        );
    }

   

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }

    return (
            <div>
                <AccountNav />
                <form onSubmit={savePlace}>
                    {preInput('Title:', 'Make it short and sweet!')}
                    <input type='text' placeholder="Title, for example: The Coastal Paradise"/> 
                    {preInput('Address:', 'Exact Location of this place.')}
                    <input type='text'  placeholder="addresss" />
                    {preInput('Contact:', 'You mobile number.')}
                    <input type='text'  placeholder="contact" />
                    {preInput('Description:', 'Description of the place')}
                    <textarea />
                    {preInput('Extra Info:', 'Add any extra info such as rules, etc.')}
                    <textarea/>
                    {preInput('Check In & Out Times:', 'Add checkin and checkout times. Remember to have some cleaning time allocated before guests arrive.')}
                    <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                        <div>
                            <h3 className="mt-2 -mb-1">Check In Time</h3>
                            <input type='text' placeholder="14"/>
                        </div>
                        <div>
                            <h3 className="mt-2 -mb-1">Check Out Time</h3>
                            <input type='text' placeholder="11"/>
                        </div>
                        <div>
                            <h3 className="mt-2 -mb-1">Max number of guests</h3>
                            <input type='number'  />
                        </div>
                        <div>
                            <h3 className="mt-2 -mb-1">Price Per Night</h3>
                            <input type='number'  />
                        </div>
                    </div>
                    <button className="primary my-4">Save</button>
                </form>
            </div>
    )
}