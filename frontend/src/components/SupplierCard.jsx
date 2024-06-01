import React from 'react';
import { Card, Button } from 'react-bootstrap';

const SupplierCard = ({ supplier }) => {
    return (
        <Card className='my-3 p-3 rounded supplier-card'>
            <Card.Img variant='top' src={supplier.image} className='supplier-card-image' />
            <Card.Body>
                <Card.Title as='div'>
                    <strong>{supplier.name}</strong>
                </Card.Title>
                <Card.Text as='div' className='supplier-card-description'>
                    {supplier.description}
                </Card.Text>
                <Card.Text as='div'>
                    Rango de Precios: {supplier.priceRange}
                </Card.Text>
                <Card.Text as='div'>
                    Rating: {supplier.ratings}
                </Card.Text>
                <Button variant='primary'>Ver más</Button>
            </Card.Body>
        </Card>
    );
};

export default SupplierCard;
