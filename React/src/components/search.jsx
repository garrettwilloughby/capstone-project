import React, { useState } from 'react';
import { useAuth } from '../hooks/AuthContext';
import { Form, InputGroup, Button, Container, Row, Col } from 'react-bootstrap';

function Search({ onSearchResults }) {
    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchCategory, setCategory] = useState('username'); // Set default value
    const employee_id = user.employee_id;

    const handleSearch = async (query) => {
        console.log('Searching for:', query, " in category:", searchCategory);
        let url = "http://localhost:3000/api/";
        if (searchCategory === "employee_id") {
            url += `fetch/${employee_id}/${query}`;
        }
        else { // searching by username
            url += `${employee_id}/${query}`;
        }
        try {
            const response = await fetch(url)
                .then(resp => resp.json());

            console.log(response);
            onSearchResults(response);
        } catch (e) {
            console.error("Error fetching search results:", e);
            onSearchResults([]);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleSearch(searchQuery);
    };

    // Define container style for fixed width
    const containerStyle = {
        maxWidth: '1200px',
        minWidth: '1000px',
        margin: '0 auto'
    };

    return (
        <div style={containerStyle} className="mb-4">
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <InputGroup className="shadow-sm">
                            <Form.Control
                                id="searchBar"
                                placeholder="Search..."
                                aria-label="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ flex: '1' }}
                            />
                            <Form.Select 
                                aria-label="Search category"
                                value={searchCategory}
                                onChange={(e) => setCategory(e.target.value)}
                                style={{ width: 'auto', flex: '0 0 180px' }}
                            >
                                <option value="username">Employee Name</option>
                                <option value="employee_id">Employee ID</option>
                            </Form.Select>
                            <Button 
                                variant="primary" 
                                type="submit"
                                className="d-flex align-items-center justify-content-center travelers-btn fw-bold"
                            >
                                Search
                            </Button>
                        </InputGroup>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

export default Search;
