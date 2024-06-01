import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/formContainer';
import { toast } from 'react-toastify';
import { useGetSupplierTypeByIdQuery, useUpdateSupplierTypeMutation } from '../../slices/supplierTypesApiSlice';

const SupplierTypesEditScreen = () => {
    const { id: supplierTypeId } = useParams();
    const navigate = useNavigate();

    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [averageRating, setAverageRating] = useState(0);

    const { data: supplierType, isLoading, error } = useGetSupplierTypeByIdQuery(supplierTypeId);
    const [updateSupplierType, { isLoading: isLoadingUpdate }] = useUpdateSupplierTypeMutation();

    useEffect(() => {
        if (supplierType) {
            setCategory(supplierType.category);
            setDescription(supplierType.description);
            setAverageRating(supplierType.averageRating);
        }
    }, [supplierType]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateSupplierType({ supplierTypeId, category, description, averageRating }).unwrap();
            toast.success('Supplier Type updated');
            navigate('/admin/suppliertypelist');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <FormContainer>
            <h1>Edit Supplier Type</h1>
            {isLoadingUpdate && <Loader />}
            {isLoading ? <Loader /> : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter category'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
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

                    <Form.Group controlId='averageRating'>
                        <Form.Label>Average Rating</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Enter average rating'
                            value={averageRating}
                            onChange={(e) => setAverageRating(e.target.value)}
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

export default SupplierTypesEditScreen;
