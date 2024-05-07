import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import userCreatedStore from './redux/store/store.js';




import './index.css';
import App from './App';
import Footer from './components/Footer';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <div className='page-wrapper'>
      <div className='content-wrapper flex-column'>
          <BrowserRouter>
            <Provider store={userCreatedStore}>
              <App />
            </Provider>
          </BrowserRouter>
      </div>
      <Footer />
    </div>
  </div>
);