import './App.css'
import {Route, Routes} from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import axios from "axios";
import { UserContextProvider } from './UserContext'
import PlacesPage from './pages/PlacesPage'
import PlacesFormPage from './pages/PlacesFormPage'
import PlacePage from './pages/PlacePage'
import BookingsPage from './pages/BookingsPage'
import BookingPage from './pages/BookingPage'
import AirlinesPage from './pages/AirlinesPage'
import AirlinesFormPage from './pages/AirlinesFormPage'
import UsersBookingPage from './pages/UsersBookingPage'
import AirlinePage from './pages/AirlinePage'
import AirlineBookingPage from './pages/AirlineBookingPage'
import UsersAirlineBookingsPage from './pages/UsersAirlineBookingsPage'
import HotelsPage from './pages/HotelsPage'
import FlightsPage from './pages/FlightsPage'
import SavingsPage from './pages/SavingsPage'
import PlaceSavingsPage from './pages/PlaceSavingsPage'
import AirlineSavingsPage from './pages/AirlineSavingsPage'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'


axios.defaults.baseURL = 'http://localhost:4000/';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage /> } />
          <Route path='/home' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/destinations' element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/hotels' element={<HotelsPage />} />
          <Route path='/flights' element={<FlightsPage />} />
          <Route path='/savings' element={<SavingsPage />} />
          <Route path='/savings/hotels' element={<PlaceSavingsPage />} />
          <Route path='/savings/airlines' element={<AirlineSavingsPage />} />
          <Route path='/account' element={<ProfilePage />} />
          <Route path='/account/places' element={<PlacesPage />} />
          <Route path='/account/places/new' element={<PlacesFormPage />} />
          <Route path='/account/places/:id' element={<PlacesFormPage />} />
          <Route path='/account/airlines' element={<AirlinesPage />} />
          <Route path='/account/airlines/new' element={<AirlinesFormPage />} />
          <Route path='/account/airlines/:id' element={<AirlinesFormPage />} />
          <Route path='/place/:id' element={<PlacePage />} />
          <Route path='/airline/:id' element={<AirlinePage />} />
          <Route path='/account/bookings' element={<BookingsPage />} />
          <Route path='/account/users' element={<UsersBookingPage />} />
          <Route path='/account/airlineBookings' element={<UsersAirlineBookingsPage />} />
          <Route path='/account/bookings/:id' element={<BookingPage />} />
          <Route path='/account/bookings/airline/:id' element={<AirlineBookingPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
