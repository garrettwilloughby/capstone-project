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

    return (
        <Container fluid className="mb-4">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <Form onSubmit={handleSubmit}>
                        <InputGroup className="mb-3 shadow-sm wide-search-input">
                            <Form.Control
                                id="searchBar"
                                placeholder="Search..."
                                aria-label="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="border-right-0"
                            />
                            <Form.Select 
                                aria-label="Search category w-50"
                                value={searchCategory}
                                onChange={(e) => setCategory(e.target.value)}
                                style={{ maxWidth: '150px' }}
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
        </Container>
    );
}

export default Search;
