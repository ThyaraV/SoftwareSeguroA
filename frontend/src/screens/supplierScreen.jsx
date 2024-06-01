import React, { useState } from 'react';
import { useGetTopSuppliersInRangeQuery } from '../slices/orderApiSlice';
import SupplierCard from '../components/SupplierCard';
import { Form, Button, Row, Col } from 'react-bootstrap';

const SupplierScreen = () => {
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [submitted, setSubmitted] = useState(false); // Nuevo estado para manejar si se ha enviado el formulario

    const handleDateChange = (e) => {
        setDateRange({ ...dateRange, [e.target.name]: e.target.value });
    };

    const handleSearch = (e) => {
        e.preventDefault(); // Previene la recarga de la página
        setSubmitted(true); // Actualiza el estado para indicar que se ha enviado el formulario
    };

    // Usa 'skip' para evitar hacer la consulta hasta que se haya enviado el formulario
    const { data: topSuppliers, isLoading, isError } = useGetTopSuppliersInRangeQuery(dateRange, {
        skip: !submitted
    });

    return (
        <div>
            <Form onSubmit={handleSearch}>
                <Row>
                    <Col md={6}>
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
                    <Col md={6}>
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
                </Row>
                <Button variant="primary" type="submit">
                    Search
                </Button>
            </Form>

            {isLoading && <p>Cargando...</p>}
            {isError && <p>Error al cargar los datos</p>}
            {topSuppliers && topSuppliers.map(supplier => (
                <SupplierCard key={supplier.supplierId} supplier={supplier} />
            ))}
        </div>
    );
};

export default SupplierScreen;
