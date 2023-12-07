import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateTable } from '../../../redux/tablesRedux';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../config';

const Table = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const tables = useSelector(state => state.tables);
  const table = tables.find(table => table.id === id);

  const [status, setStatus] = useState(table ? table.status : 'Free');
  const [peopleAmount, setPeopleAmount] = useState(table ? table.peopleAmount : 0);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(table ? table.maxPeopleAmount : 4);
  const [bill, setBill] = useState(table ? table.bill : 0);

  const navigate = useNavigate();

  useEffect(() => {
    if (table) {
      setStatus(table.status);
      setPeopleAmount(table.status !== 'Busy' ? 0 : table.peopleAmount);
      setMaxPeopleAmount(table.maxPeopleAmount);
      setBill(table.status === 'Busy' ? bill : 0);
    }
  }, [table], );

  const handleStatusChange = (newStatus) => {
    if (newStatus === 'Busy') {
      setBill(0);
    }

    if (newStatus === 'Cleaning' || newStatus === 'Free') {
      setPeopleAmount(0);
    }

    setStatus(newStatus);
  };

  const handleUpdate = () => {
    const updatedTable = {
      id,
      status,
      peopleAmount,
      maxPeopleAmount,
      bill,
    };

    if (peopleAmount > maxPeopleAmount) {
      setPeopleAmount(maxPeopleAmount);
      updatedTable.peopleAmount = maxPeopleAmount;
    }
    dispatch(updateTable(updatedTable));

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTable)
    };

    fetch(API_URL + `/tables/${id}`, options)
      .then(response => {
        if (response.ok) {
          navigate('/');
        } else {
          console.error('Failed to update the table on the server.');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <Container>
      <Row>
        <Col md={4}>
          <Form>
            <Form.Group>
              <Form.Label>Status:</Form.Label>
              <Form.Control
                as="select"
                value={status}
                onChange={e => handleStatusChange(e.target.value)}
              >
                <option value="Free">Free</option>
                <option value="Reserved">Reserved</option>
                <option value="Busy">Busy</option>
                <option value="Cleaning">Cleaning</option>
              </Form.Control>
            </Form.Group>

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label className="mt-3">People:</Form.Label>
                  <Form.Control
                    type="number"
                    value={peopleAmount} 
                    onChange={e => setPeopleAmount(parseInt(e.target.value))}
                  /> 
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label className="mt-3">Max People:</Form.Label>
                  <Form.Control
                    type="number"
                    value={maxPeopleAmount}
                    onChange={e => setMaxPeopleAmount(parseInt(e.target.value))}
                  />
                </Form.Group>
              </Col>
            </Row>

            {status === 'Busy' && (
              <Form.Group>
                <Form.Label className="mt-3"> $ Bill:</Form.Label>
                <Form.Control
                  type="number"
                  value={bill}
                  onChange={e => setBill(parseFloat(e.target.value))}
                />
              </Form.Group>
            )}

            <Link to='/'>
              <Button variant="primary mt-3" onClick={handleUpdate}>
                Update
              </Button>
            </Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Table;
