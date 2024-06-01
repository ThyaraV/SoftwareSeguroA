import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Message from '../../components/message';
import Loader from '../../components/Loader';
import { useGetServicesQuery, useCreateServiceMutation, useDeleteServiceMutation } from '../../slices/servicesApiSlice.js';
import { toast } from 'react-toastify';

const ServiceListScreen = () => {
    const { data: services, isLoading, error, refetch } = useGetServicesQuery();
    const [createService, { isLoading: loadingCreate }] = useCreateServiceMutation();
    const [deleteService, { isLoading: loadingDelete }] = useDeleteServiceMutation();

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await deleteService(id).unwrap();
                toast.success('Service deleted');
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    const createServiceHandler = async () => {
        if (window.confirm('Are you sure you want to create a new service?')) {
            try {
                await createService().unwrap();
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Services</h1>
                </Col>
                <Col className='text-end'>
                    <Button className='btn-sm m-3' onClick={createServiceHandler}>
                        <FaEdit /> Create Service
                    </Button>
                </Col>
            </Row>

            {loadingCreate && <Loader />}
            {loadingDelete && <Loader />}
            {isLoading ? <Loader /> : error ? <Message variant='danger'>
                {error}
            </Message> : (
                <>
                    <Table stripped hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>TYPE</th>
                                <th>AVERAGE COST</th>
                                <th>POPULARITY</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service) => (
                                <tr key={service._id}>
                                    <td>{service._id}</td>
                                    <td>{service.type}</td>
                                    <td>${service.averageCost}</td>
                                    <td>{service.popularity}</td>
                                    <td>
                                        <LinkContainer to={`/admin/service/${service._id}/edit`}>
                                            <Button variant='light' className='btn-sm mx-2'>
                                                <FaEdit />
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm'
                                            onClick={() => deleteHandler(service._id)}>
                                            <FaTrash style={{ color: 'white' }} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
        </>
    )
}

export default ServiceListScreen;
