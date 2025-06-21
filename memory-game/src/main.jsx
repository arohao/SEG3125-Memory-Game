import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { BrowserRouter, Routes, Route} from 'react-router';
import App from './pages/App.jsx'
import Play from './pages/Play.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/play' element={<Play/>}/>
    </Routes>
  </BrowserRouter>,
)
