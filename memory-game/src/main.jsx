import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { BrowserRouter, Routes, Route} from 'react-router';
import App from './pages/App.jsx'
import Play from './pages/Play.jsx'
import HowToPlay from './pages/HowToPlay.jsx'
import Leaderboard from './pages/Leaderboard.jsx'
import SignUp from './pages/SignUp.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/play' element={<Play/>}/>
      <Route path='/how-to-play' element={<HowToPlay />}/>
      <Route path='/leaderboard' element={<Leaderboard />}/>
      <Route path='/sign-up' element={<SignUp />}/>

    </Routes>
  </BrowserRouter>,
)
