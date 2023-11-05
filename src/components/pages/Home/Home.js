import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTables } from '../../../redux/tablesRedux';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const tables = useSelector((state) => state.tables);

  useEffect(() => {
    fetch('http://localhost:3131/api/tables')
      .then((response) => response.json())
      .then((data) => {
        dispatch(setTables(data));
      });
  }, [dispatch]);

  return (
    <div>
      <h2 className="d-flex justify-content-between mb-4">All Tables</h2>
      {tables.length > 0 ? (
        <div>
          {tables.map((table, index) => (
            <div key={table.id} className="my-4 mt-5 p-0">
              <div className="d-flex justify-content-between">
                <h3>Table {table.id}</h3>
                <div className="d-flex">
                  <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginRight: '10px' }}>Status:</p>
                  <p style={{ marginBottom: '0', fontSize: '1.2rem' }}>{table.status}</p>
                </div>
                <Link to={`/table/${table.id}`}>
                  <Button variant="primary" className="ml-auto">Show more</Button>
                </Link>
              </div>
              {index < tables.length - 1 && <hr className="mt-3" />}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading tables...</p>
      )}
    </div>
  );
};

export default Home;
