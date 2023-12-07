import React from 'react';
import { useSelector } from 'react-redux';
import TableEdit from './TableEdit';

const Tables = ({id}) => {
  const tables = useSelector((state) => state.tables); 

  return (
    <div className="tables">
      <h2>Tables</h2>
      <div className="table-list">
        {tables.map((table) => (
          <TableEdit key={table.id} table={table} />
        ))}
      </div>
      
       

    </div>
  );
};

export default Tables;
