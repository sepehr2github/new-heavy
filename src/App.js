import '../src/App.css';
import Navbar from './component/layout/navbar';
import Home from './component/layout/home';
import React from 'react';
import LabelBottomNavigation from './component/layout/buttomNavigation'



function App() {
  return (
    <div >
      <Navbar />
      <Home />
      <LabelBottomNavigation />
    </div>
  );
}



export default App;





