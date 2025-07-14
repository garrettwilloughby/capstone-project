import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card, Spinner, Alert } from "react-bootstrap";

function Analysis() {
    const [role, setRole] = useState("Software Engineer");
    const [location, setLocation] = useState("New York");
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const jobRoles = ["Data Engineer", "Software Engineer", "UX Designer", "Devops Engineer"];
    const locations = ["New York", "Shanghai", "London", "Cairo", "San Francisco"];

    // Clear results when role or location changes
    useEffect(() => {
        setResults(null);
        setError(null);
    }, [role, location]);

    const analyze = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://127.0.0.1:5000/predict`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "job_roles": role, "location": location }),
            });
            const data = await response.json();
            console.log(data);
        
            if (data != null) {
                setResults(data);
            } else {
                throw new Error(data.message || 'Analysis failed');
            }
        } catch (error) {
            console.error("Analysis error:", error);
            setError("Failed to analyze data. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        analyze();
    };

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    // Define styles for fixed width
    const containerStyle = {
        maxWidth: '1000px',
        minWidth: '800px',
        margin: '0 auto'
    };

    const cardStyle = {
        width: '100%'
    };

    return (
        <Container className="mt-5" style={containerStyle}>
            <Row className="justify-content-center mb-4">
                <Col>
                    <Card className="shadow" style={cardStyle}>
                        <Card.Header as="h4" className="text-black">
                            Job Market Analysis
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Row className="mb-3">
                                    <Col md={6}>
                                        <Form.Group controlId="jobRole">
                                            <Form.Label>Job Role</Form.Label>
                                            <Form.Select 
                                                value={role} 
                                                onChange={handleRoleChange}
                                                required
                                            >
                                                {jobRoles.map((jobRole) => (
                                                    <option key={jobRole} value={jobRole}>
                                                        {jobRole}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="location">
                                            <Form.Label>Location</Form.Label>
                                            <Form.Select 
                                                value={location} 
                                                onChange={handleLocationChange}
                                                required
                                            >
                                                {locations.map((loc) => (
                                                    <option key={loc} value={loc}>
                                                        {loc}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <div className="d-grid gap-2">
                                    <Button 
                                        variant="primary" 
                                        type="submit" 
                                        disabled={loading}
                                        className="travelers-btn fw-bold"
                                    >
                                        {loading ? (
                                            <>
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                    className="me-2"
                                                />
                                                Analyzing...
                                            </>
                                        ) : (
                                            "Analyze Job Market"
                                        )}
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {error && (
                <Row className="justify-content-center">
                    <Col>
                        <Alert variant="danger">{error}</Alert>
                    </Col>
                </Row>
            )}

            {results && (
                <Row className="justify-content-center mt-4">
                    <Col>
                        <Card className="shadow" style={cardStyle}>
                            <Card.Header as="h5" className="bg-success text-white">
                                Analysis Results
                            </Card.Header>
                            <Card.Body>
                                <h5>Job Market Analysis for {role} in {location}</h5>
                                
                                {/* Display prediction results */}
                                {results.predicted_salary && (
                                    <div className="mb-3">
                                        <h6>Salary Prediction</h6>
                                        <p className="lead">${results.predicted_salary.toLocaleString()}</p>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default Analysis;
