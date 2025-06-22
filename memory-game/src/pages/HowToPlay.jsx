import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import '../styles/App.css';

function HowToPlay() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Nav />
      <Container className="flex-grow-1 py-5 text-start">
        <h1 className="mb-4 text-center">How to Play</h1>

        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Card.Title>🎯 Objective</Card.Title>
            <Card.Text>
              Flip and match all card pairs with the fewest mistakes possible.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Card.Title>🕹️ How to Play</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item>Click two cards to flip them.</ListGroup.Item>
              <ListGroup.Item>If they match, they stay flipped and you earn points.</ListGroup.Item>
              <ListGroup.Item>If they don't match, they flip back and you lose a move.</ListGroup.Item>
              <ListGroup.Item>Game ends when all cards are matched or you run out of moves.</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>

        <Row>
          <Col md={6}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>📈 Scoring</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>+200 for every match</ListGroup.Item>
                  <ListGroup.Item>−50 for every mismatch</ListGroup.Item>
                  <ListGroup.Item>+500 bonus if you finish in under 30 seconds</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>🎚️ Difficulty Levels</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>Easy: 8 mistakes allowed</ListGroup.Item>
                  <ListGroup.Item>Medium: 5 mistakes allowed</ListGroup.Item>
                  <ListGroup.Item>Hard: 3 mistakes allowed</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title>🏆 High Scores</Card.Title>
            <Card.Text>
              Your highest scores are saved for each difficulty level. Try to beat your best!
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </div>
  );
}

export default HowToPlay;
