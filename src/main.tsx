import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router';
import Layout from './Components/Layout';
import { Home } from './Components/Home';
import { SignIn } from './Components/Signin';
import { User } from './Components/User';
import { store } from "./app/store"
import { Provider } from 'react-redux';

const container = document.getElementById('root');

if (container) {
  createRoot(container).render(
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<SignIn />} />
              <Route path="profile" element={<User />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </StrictMode>,
  )
}
else {
  throw new Error(
    "Root element with ID 'root' could not be found in the document",
  )
}