import React from 'react';
import { Employee } from '../components';
import { useNavigate } from 'react-router-dom';

function Table({ data, headers }) {
    const navigate = useNavigate();
 
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const handleRowClick = (row) => {
    //console.log(row.employee_id);
    navigate(`/employee/${row.employee_id}`)
  }

  // get columns 
  const columnKeys = Object.keys(data[0]);
  
  // format column display name to remove underscores and capitalize each word
  const formatColumnName = (column) => {
    return column
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // map each column to key
  const columnMapping = {};
  columnKeys.forEach(key => {
    columnMapping[formatColumnName(key)] = key;
  });

  // if headers are provided, filter to only include those that match data columns
  const displayHeaders = headers || columnKeys.map(formatColumnName);
  
  // get the matching original column keys for each header
  const matchingColumns = displayHeaders
    .map(header => {
      // find the original column key that matches this header
      return {
        header,
        originalKey: columnMapping[header]
      };
    })
    .filter(item => item.originalKey !== undefined); // filter out headers with no matching data column

  return (
    <table className="border">
      <thead>
        <tr className='border'>
          {matchingColumns.map((column, index) => (
            <th key={index}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr onClick={() => handleRowClick(row)} style={{ cursor: 'pointer' }} className="border" key={rowIndex}>
            {matchingColumns.map((column, colIndex) => (
              <td key={`${rowIndex}-${colIndex}`}>{row[column.originalKey]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
