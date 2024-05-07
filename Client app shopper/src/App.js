import {Route, Routes} from 'react-router-dom';

import AllCakesPage from './pages/AllCakes';
import AllCookiesPage from './pages/AllCookies';
import CartPage from './pages/Cart';
import ContactPage from './pages/Contact';
import DetailsPage from './pages/Details';
import LoginPage from './pages/Login';
import MainPage from './pages/MainPage';
import NotificationsPage from './pages/Notifications';
import PersonalDataPage from './pages/PersonalData';
import UpdatePasswordPage from './pages/UpdatePassword';

function App() {
  return (  
      <div>
        <Routes>
          <Route exact path='/' element={<LoginPage />} />
          <Route path='/all-cakes' element={<AllCakesPage />} />
          <Route path='/all-cookies' element={<AllCookiesPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path="/details/cake/:index" element={<DetailsPage type="cake"/>} />
          <Route path="/details/cookie/:index" element={<DetailsPage type="cookie"/>} />
          <Route path='/main' element={<MainPage />} />
          <Route path='/notifications' element={<NotificationsPage />} />
          <Route path='/personal-data' element={<PersonalDataPage />} />
          <Route path='/update-password' element={<UpdatePasswordPage />} />
        </Routes>
      </div>
  );
}

export default App;
