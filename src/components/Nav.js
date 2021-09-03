
import Navbar from 'react-bootstrap/Navbar'
import { Container, Nav, NavDropdown } from "react-bootstrap";
function NavBar() {
  return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
           
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/">Agent</NavDropdown.Item>
              <NavDropdown.Item href="/agency">Agency</NavDropdown.Item>
            
            </NavDropdown>
          </Nav>
          
        </Navbar.Collapse>
        </Container>
      </Navbar>
  );
  }
  export default NavBar;



