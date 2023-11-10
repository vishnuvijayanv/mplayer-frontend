import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div><Navbar className="bg-dark">
    <Container>
      <Navbar.Brand>
        <Link to={'/'} style={{textDecoration:'none',color:'white',fontSize:'30px'}}>
        <i class="fa-solid fa-video fa-beat text-primary me-4 " ></i>{' '}
        Media Player
        </Link>
    
      </Navbar.Brand>
    </Container>
  </Navbar></div>
  )
}

export default Header