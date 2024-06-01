import {LinkContainer} from 'react-router-bootstrap';
import {Table,Button,Row,Col} from 'react-bootstrap';
import {FaEdit, FaTrash} from 'react-icons/fa';
import Message from '../../components/message';
import Loader from '../../components/Loader';
import { useGetProductsQuery,useCreateProductMutation,useDeleteProductMutation } from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';

const ProductListScreen = () => {
    const {data:products, isLoading, error,refetch}=useGetProductsQuery();
    const [createProduct,{isLoading:loadingCreate}]=useCreateProductMutation();
    const [deleteProduct,{isLoading:loadingDelete}]=useDeleteProductMutation();
    
    const deleteHandler=async(id)=>{
        if(window.confirm('Are you sure?')){
            try{
                await deleteProduct(id);
                toast.success('Product deleted');
                refetch();
            }catch(err){
                toast.error(err?.data?.Message || (typeof err.error === 'object' ? JSON.stringify(err.error) : err.error));
            }
        }

     };

    const createProductHandler=async()=>{
        if(window.confirm('Are you sure you want to create a new product?')){
            try{
                await createProduct();
                refetch();
            }catch(err){
                toast.error(err?.data?.Message || (typeof err.error === 'object' ? JSON.stringify(err.error) : err.error));
            }
        }
    }
    return <>
    <Row className='align-items-center'>
        <Col>
            <h1>Events</h1>
        </Col>
        <Col className='text-end'>
            <Button className='btn-sm m-3' onClick={createProductHandler}>
                <FaEdit/>Create Event
            </Button>
        </Col>

    </Row>

    {loadingCreate && <Loader/>}
    {loadingDelete && <Loader/>}
    {isLoading ? <Loader/> : error ? <Message variant='danger'>
        {error.message || "An error occurred"}
    </Message>:(
        <>
            <Table stripped hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        {/*<th>CATEGORY</th>*/}
                        {/*<th>BRAND</th>*/}
                        <th>SERVICE</th>
                        <th>SUPPLIER TYPE</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product)=>(
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            {/*<td>{product.category}</td>*/}
                            {/*<td>{product.brand}</td>*/}
                            <td>{product.service?.type || 'N/A'}</td> {/* Mostrar el tipo de servicio */}
                            <td>{product.supplierType?.category || 'N/A'}</td> {/* Mostrar la categoría del proveedor */}
                            <td>
                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                    <Button variant='light' className='btn-sm mx-2'>
                                        <FaEdit/>
                                    </Button>
                                </LinkContainer>
                                <Button variant='danger' className='btn-sm'
                                onClick={()=>deleteHandler(product._id)}>
                                        <FaTrash style={{color:'white'}}/>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>

    )}   
    </>
}

export default ProductListScreen