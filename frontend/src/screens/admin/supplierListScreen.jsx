import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Message from '../../components/message';
import Loader from '../../components/Loader';
import { useGetSuppliersQuery, useCreateSupplierMutation, useDeleteSupplierMutation } from '../../slices/supplierApiSlice';
import { toast } from 'react-toastify';

const SupplierListScreen = () => {
  const { data: suppliers, isLoading, error, refetch } = useGetSuppliersQuery();
  const [createSupplier, { isLoading: loadingCreate }] = useCreateSupplierMutation();
  const [deleteSupplier, { isLoading: loadingDelete }] = useDeleteSupplierMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteSupplier(id).unwrap();
        toast.success('Supplier deleted');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createSupplierHandler = async () => {
    if (window.confirm('Are you sure you want to create a new supplier?')) {
      try {
        await createSupplier().unwrap();
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
          <h1>Suppliers</h1>
        </Col>
        <Col className='text-end'>
          <Button className='btn-sm m-3' onClick={createSupplierHandler}>
            <FaEdit /> Create Supplier
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? <Loader /> : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table stripped hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Supplier Type</th>
                <th>Name</th>
                <th>Price Range</th>
                <th>Ratings</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier._id}>
                  <td>{supplier._id}</td>
                  <td>{supplier.supplierType?.category || 'N/A'}</td>
                  <td>{supplier.name}</td>
                  <td>{supplier.priceRange}</td>
                  <td>{supplier.ratings}</td>
                  <td>
                    <img src={supplier.image} alt={supplier.name} style={{ maxWidth: '50px' }} />
                  </td>
                  <td>
                    <LinkContainer to={`/admin/supplier/${supplier._id}/edit`}>
                      <Button variant='light' className='btn-sm mx-2'>
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(supplier._id)}>
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
  );
};

export default SupplierListScreen;
