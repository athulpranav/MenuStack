import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MenuDetails from './pages/MenuDetails';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menus/:id" element={<MenuDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
