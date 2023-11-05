
import React from 'react';


const TableEdit = ({ table }) => {
  return (
    <div className="table-item">
      <h3>Table {table.id}</h3>
      <p>Status: {table.status}</p>
      <p>People: {table.peopleAmount} / {table.maxPeopleAmount}</p>
      <p>Bill: {table.bill}</p>
      
    </div>
  );
};

export default TableEdit;
