import logo from '../assets/logo.svg'

function Nav() {


  return (
    <nav className=''>
      <div>
        <img alt='test' src={logo} width='50'/>
        <span className='h3'>Memory Game</span>
      </div>
     

    </nav>
  )
}

export default Nav;