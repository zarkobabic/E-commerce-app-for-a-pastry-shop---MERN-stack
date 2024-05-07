import {Route, Routes} from 'react-router-dom';

import LoginPage from './pages/Login';
import AddProductPage from './pages/AddProductPage';
import RequestsPage from './pages/RequestsPage';

function App() {
  return (  
      <div>
        <Routes>
          <Route exact path='/' element={<LoginPage />} />
          <Route exact path='/requests' element={<RequestsPage />} />
          <Route path='/add-product' element={<AddProductPage />} />
        </Routes>
      </div>
  );
}

export default App;
