import React, { useState } from 'react';
import { useAuth } from '../hooks/AuthContext';

function Search(){
    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchCategory, setCategory] = useState('');
    const employee_id = user.employee_id;

    const handleSearch = async (query) => {
        // Implement your search logic here
        console.log('Searching for:', query, " in category:", searchCategory);
        let url = "http://localhost:3000/api/";
        if (searchCategory === "employee_id") {
            url += `fetch/${employee_id}/${query}`;
        }
        else { // searching by username
            url += `${employee_id}/${query}`;
        }
        const response = await fetch(url)
                .then(resp => resp.json());
        console.log(response);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // also handl
        handleSearch(searchQuery);
    };

    return (
        <>
          <div className="search-container">
            <form onSubmit={handleSubmit}>
                <input
                    id="searchBar"
                    type="text"
                    placeholder="Search.."
                    name="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select
                    name="search_by"
                    id="category"
                    value={searchCategory}
                    onChange={(e) => setCategory(e.target.value)}
                    >
                    <option value="username">Employee Name</option>
                    <option value="employee_id">Employee ID</option>
                    </select>
                <button type="submit">
                    <i className="fa fa-search"></i>
                </button>
            </form>
          </div>
        </>
      );
}

export default Search;