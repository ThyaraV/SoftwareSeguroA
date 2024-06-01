import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/formContainer';
import { toast } from 'react-toastify';
import { useGetServiceDetailsQuery, useUpdateServiceMutation } from '../../slices/servicesApiSlice';

const ServiceEditScreen = () => {
    const { id: serviceId } = useParams();
    const navigate = useNavigate();

    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [averageCost, setAverageCost] = useState(0);
    const [popularity, setPopularity] = useState(0);

    const { data: service, isLoading, error } = useGetServiceDetailsQuery(serviceId);
    const [updateService, { isLoading: isLoadingUpdate }] = useUpdateServiceMutation();

    useEffect(() => {
        if (service) {
            setType(service.type);
            setDescription(service.description);
            setAverageCost(service.averageCost);
            setPopularity(service.popularity);
        }
    }, [service]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateService({ serviceId, type, description, averageCost, popularity }).unwrap();
            toast.success('Service updated');
            navigate('/admin/servicelist');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <FormContainer>
            <h1>Edit Service</h1>
            {isLoadingUpdate && <Loader />}
            {isLoading ? <Loader /> : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='type'>
                        <Form.Label>Type</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter type'
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='averageCost'>
                        <Form.Label>Average Cost</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Enter average cost'
                            value={averageCost}
                            onChange={(e) => setAverageCost(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='popularity'>
                        <Form.Label>Popularity</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Enter popularity'
                            value={popularity}
                            onChange={(e) => setPopularity(e.target.value)}
                        />
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                </Form>
            )}
        </FormContainer>
    );
};

export default ServiceEditScreen;
