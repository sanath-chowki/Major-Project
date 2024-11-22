import { BrowserRouter,Route,Routes} from 'react-router-dom';
import './App.css';
import Nav from './Components/Nav'
import SignIn from './Components/SignIn';
import UserPage from './Components/UserPage';
import MakeConvention from './Components/MakeConvention';
import MakeTransfer from './Components/MakeTransfer';
import LandOfficer from './Components/LandOfficer';
import Login from './Components/Login';
import Logout from './Components/Logout';
import LandForSale from './Components/LandForSale';
import Home from './Components/Home';
function App() {
  return (
    <div className="App"><BrowserRouter>
    {/* <Nav /> */}
   <Routes>

    <Route path='/' element={<Home/>}/>
    <Route path='/signin' element={<SignIn/>}/>
    <Route path="/login" element={<Login />} />
    <Route path="/logout" element={<Logout />} />
    <Route path='/userpage' element={<UserPage/>}/>
    <Route path='/make_convention' element={<MakeConvention/>}/>
    <Route path='/make_transfer' element={<MakeTransfer/>}/>
    <Route path='/landofficer' element={<LandOfficer/>}/>
    <Route path='/make_transfer' element={<MakeTransfer/>}/>
    <Route path='/landforsale' element={<LandForSale/>}/>
    </Routes>
    
    </BrowserRouter>
    
    </div>
  );
}

export default App;
