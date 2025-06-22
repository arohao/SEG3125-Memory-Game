import { Container, Card, Form, Button } from 'react-bootstrap';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import '../styles/App.css';

function Signup() {
  return (
    <>
    <Nav />
    <div className="d-flex flex-column min-vh-100 bg-gradient">
      <Container className="d-flex justify-content-center align-items-center flex-grow-1 py-5">
        <Card className="p-4 shadow" style={{ maxWidth: '500px', width: '100%' }}>
          <h2 className="text-center mb-4 text-primary">Create an Account</h2>
          <Form>
            <Form.Group controlId="firstName" className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter first name" />
            </Form.Group>

            <Form.Group controlId="lastName" className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter last name" />
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Create a password" />
            </Form.Group>

            <Form.Group controlId="confirmPassword" className="mb-4">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm your password" />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Sign Up
            </Button>

            <div className="text-center mt-3">
              <small>
                Already have an account? <a href="/login">Log in</a>
              </small>
            </div>
          </Form>
        </Card>
      </Container>
    </div>
    <Footer />
    </>
  );
}

export default Signup;
