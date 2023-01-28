import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";

import Routines from "./component/routines/routines";
import Newroutin from "./component/routines/newroutine";

import Exercise from "./component/exerciseShow/exercise";
import Login from "./component/authentication/login";
import Logout from "./component/authentication/logout";
import Settings from "./component/layout/settings";
import Check from "./component/authentication/checkNumber";
// import { FontAwesomeIcon } from '@fortawesome/free-solid-svg-icons'

import { store } from './store'
import { Provider } from 'react-redux'
import CardSelect from "./component/routines/cardSelect";
import RoutinesDay from "./component/routines/routinesDay";
import EditeRoutines from "./component/routines/updateRoutines/editeRoutines"
import PrivateRoutes from "./component/authentication/privetRoutes";
import LabelBottomNavigation from './component/layout/buttomNavigation'
import Footer from "./component/layout/footer";
// 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter >
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route element={<PrivateRoutes />}>

            <Route path="/" element={<App />} />
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
            <Route path="check" element={<Check />} />
            <Route path="settings" element={<Settings />} />
            <Route path="routines" element={<Suspense fallback={<h3>loading ....</h3>}><Routines /></Suspense>} />
            <Route path="exercise" element={<Exercise />} />
            <Route path="routines/newroutin" element={<Newroutin />} />
            <Route path="routines/routinesDay/:id" element={<RoutinesDay />} />
            <Route path="routines/editeRoutin/:id" element={<EditeRoutines />} />

          </Route>
        </Routes>
      </BrowserRouter>
      <LabelBottomNavigation />
      <Footer />

    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

