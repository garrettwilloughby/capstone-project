import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Table.css';

function Table({ data, headers, itemsPerPage = 10 }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  
  useEffect(() => {
    if (!data || data.length === 0) return;
    

    const pages = Math.ceil(data.length / itemsPerPage);
    setTotalPages(pages);
   
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentData(data.slice(startIndex, endIndex));
  }, [data, currentPage, itemsPerPage]);

  if (!data || data.length === 0) {
    return <div className="no-data-message">No data available</div>;
  }

  const handleRowClick = (row) => {
    navigate(`/employee`, { state: {employeeId: row.employee_id}});
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

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="table-responsive">
      <table className="custom-table">
        <thead>
          <tr>
            {matchingColumns.map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, rowIndex) => (
            <tr 
              onClick={() => handleRowClick(row)} 
              key={rowIndex}
              className="table-row"
            >
              {matchingColumns.map((column, colIndex) => (
                <td key={`${rowIndex}-${colIndex}`}>{row[column.originalKey]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            className="pagination-button"
            onClick={() => handlePageChange(1)} 
            disabled={currentPage === 1}
          >
            &laquo;
          </button>
          
          <button 
            className="pagination-button"
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1}
          >
            &lsaquo;
          </button>
          
          <div className="pagination-info">
            Page {currentPage} of {totalPages}
          </div>
          
          <button 
            className="pagination-button"
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={currentPage === totalPages}
          >
            &rsaquo;
          </button>
          
          <button 
            className="pagination-button"
            onClick={() => handlePageChange(totalPages)} 
            disabled={currentPage === totalPages}
          >
            &raquo;
          </button>
        </div>
      )}
    </div>
  );
}

export default Table;
