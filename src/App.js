import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ThemeProvider } from './context/ThemeContext';
import Home from './routes/Home';
import Signin from './routes/Signin';
import Signup from './routes/Signup';
import HeroID from './routes/HeroID';
import { AuthContextProvider } from './context/AuthContext';
import Account from './routes/Account';



function App() {


  return (
    <ThemeProvider>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/account' element={<Account />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/id/:id' element={<HeroID />}>
            <Route path=':id' />
          </Route>
          <Route
            path="*"
            element={<Navigate to="/signin" replace />}
          />

        </Routes>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
