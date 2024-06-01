import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Message from '../../components/message';
import Loader from '../../components/Loader';
import { useGetSupplierTypesQuery, useCreateSupplierTypeMutation, useDeleteSupplierTypeMutation } from '../../slices/supplierTypesApiSlice';
import { toast } from 'react-toastify';

const SupplierTypesListScreen = () => {
    const { data: supplierTypes, isLoading, error, refetch } = useGetSupplierTypesQuery();
    const [createSupplierType, { isLoading: loadingCreate }] = useCreateSupplierTypeMutation();
    const [deleteSupplierType, { isLoading: loadingDelete }] = useDeleteSupplierTypeMutation();

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await deleteSupplierType(id).unwrap();
                toast.success('Supplier Type deleted');
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    const createSupplierTypeHandler = async () => {
        if (window.confirm('Are you sure you want to create a new supplier type?')) {
            try {
                await createSupplierType().unwrap();
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
                    <h1>Supplier Types</h1>
                </Col>
                <Col className='text-end'>
                    <Button className='btn-sm m-3' onClick={createSupplierTypeHandler}>
                        <FaEdit /> Create Supplier Type
                    </Button>
                </Col>
            </Row>

            {loadingCreate && <Loader />}
            {loadingDelete && <Loader />}
            {isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Table stripped hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>CATEGORY</th>
                            <th>DESCRIPTION</th>
                            <th>AVERAGE RATING</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {supplierTypes?.map((supplierType) => (
                            <tr key={supplierType._id}>
                                <td>{supplierType._id}</td>
                                <td>{supplierType.category}</td>
                                <td>{supplierType.description}</td>
                                <td>{supplierType.averageRating.toFixed(1)}</td>
                                <td>
                                    <LinkContainer to={`/admin/suppliertype/${supplierType._id}/edit`}>
                                        <Button variant='light' className='btn-sm mx-2'>
                                            <FaEdit />
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm'
                                        onClick={() => deleteHandler(supplierType._id)}>
                                        <FaTrash />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
}

export default SupplierTypesListScreen;
