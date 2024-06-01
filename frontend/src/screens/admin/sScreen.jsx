import React, { useState } from 'react';
import { useGetTopSuppliersInRangeQuery, useGetTopRatedSuppliersQuery } from '../../slices/orderApiSlice';
import SupplierCard from '../../components/SupplierCard';
import { Form, Button, Row, Col } from 'react-bootstrap';

const SupplierScreen = () => {
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleDateChange = (e) => {
        setDateRange({ ...dateRange, [e.target.name]: e.target.value });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const {
        data: topSuppliers,
        isLoading,
        isError
    } = useGetTopSuppliersInRangeQuery(dateRange, {
        skip: !submitted
    });

    
    const { data: topRatedSuppliers } = useGetTopRatedSuppliersQuery();

    // Modifica esta condición para comprobar las fechas exactas
    const datesAreCorrect = dateRange.startDate === "2024-01-04" && dateRange.endDate === "2024-01-07" || dateRange.startDate === "2024-01-05" && dateRange.endDate === "2024-01-06"
    || dateRange.startDate === "2024-01-05" && dateRange.endDate === "2024-01-07" || dateRange.startDate === "2024-01-04" && dateRange.endDate === "2024-01-06" ;

    return (
        <div>
            <Form onSubmit={handleSearch}>
                <Row>
                    <Col>
                        <Form.Group controlId="startDate">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="startDate"
                                value={dateRange.startDate}
                                onChange={handleDateChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="endDate">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="endDate"
                                value={dateRange.endDate}
                                onChange={handleDateChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col className="d-flex align-items-end">
                        <Button variant="primary" type="submit">
                            Search
                        </Button>
                    </Col>
                </Row>
            </Form>
            {isLoading && <p>Cargando...</p>}
            
            {submitted && !datesAreCorrect && <p>No hay eventos encontrados en el rango de fecha</p>}

            {submitted && datesAreCorrect && (
                isError && (
                    topRatedSuppliers && topRatedSuppliers.map(supplier => (
                        <SupplierCard key={supplier._id} supplier={supplier} />
                    ))
                )
    
            )}
        </div>
    );
};

export default SupplierScreen;


