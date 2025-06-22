import { useState } from 'react';
import { Container, Nav, Tab, Table, Card } from 'react-bootstrap';
import NavBar from '../components/Nav';
import Footer from '../components/Footer';
import '../styles/App.css';

function Leaderboard() {
  const sampleData = {
    Easy: [
      { name: 'Ava', score: 1200 },
      { name: 'Liam', score: 1100 },
      { name: 'Maya', score: 950 },
    ],
    Medium: [
      { name: 'Noah', score: 1400 },
      { name: 'Olivia', score: 1300 },
      { name: 'Lucas', score: 1250 },
    ],
    Hard: [
      { name: 'Emma', score: 1600 },
      { name: 'Ethan', score: 1450 },
      { name: 'Zoe', score: 1400 },
    ],
  };

  const [difficulty, setDifficulty] = useState('Easy');

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <Container className="page-wrapper py-5 my-5 container-section flex-grow-1 bg-white rounded-4 shadow bg-gradient">
        <h1 className="text-center mb-4 text-white">🏆 Leaderboard</h1>

        <Tab.Container activeKey={difficulty} onSelect={(k) => setDifficulty(k)}>
          <Nav variant="tabs" className="justify-content-center mb-4">
            {['Easy', 'Medium', 'Hard'].map((level) => (
              <Nav.Item key={level}>
                <Nav.Link eventKey={level}>{level}</Nav.Link>
              </Nav.Item>
            ))}
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey={difficulty}>
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <Table striped hover responsive className="mb-0 text-center">
                    <thead>
                      <tr className="table-primary">
                        <th>#</th>
                        <th>Player</th>
                        <th>Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sampleData[difficulty].map((entry, index) => (
                        <tr key={entry.name}>
                          <td>{index + 1}</td>
                          <td>{entry.name}</td>
                          <td>{entry.score}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
      <Footer />
    </div>
  );
}

export default Leaderboard;
