import { useState,useEffect } from "react"
import {Link,useNavigate,useParams} from 'react-router-dom';
import {Form,Button} from 'react-bootstrap';
import Message from "../../components/message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/formContainer";
import {toast} from 'react-toastify'
import { useUpdateProductMutation, useGetProductsDetailsQuery,useUploadProductImageMutation } from "../../slices/productsApiSlice";
import { useGetServicesQuery } from "../../slices/servicesApiSlice";
import { useGetSupplierTypesQuery } from "../../slices/supplierTypesApiSlice";

const ProductEditScreen = () => {
    const {id: productId}=useParams();

    const [name,setName]=useState('');
    const[price,setPrice]=useState(0);
    const [image, setImage]=useState('');
    const[brand,setBrand]=useState('');
    const [category,setCategory]=useState('');
    const[description,setDescription]=useState('');
  
    const [service, setService] = useState('');
    const [supplierType, setSupplierType] = useState('');

    const {
        data:product,
        isLoading,
        refetch,
        error,
    }=useGetProductsDetailsQuery(productId);

    const [updateProduct,{isLoading:loadingUpdate}]=useUpdateProductMutation();
    const[uploadProductImage,{isLoading:loadingUpload}]=useUploadProductImageMutation();

      // Obtiene datos de servicios y tipos de proveedores
      const { data: services } = useGetServicesQuery();
      const { data: supplierTypes } = useGetSupplierTypesQuery();

    const uniqueServiceTypes = Array.from(new Set(services?.map(service => service.type))).map(type => {
        return services.find(service => service.type === type);
    });

    const uniqueSupplierCategories = Array.from(new Set(supplierTypes?.map(type => type.category))).map(category => {
        return supplierTypes.find(type => type.category === category);
    });

    const navigate =useNavigate();

    useEffect(()=>{
        if(product){
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setDescription(product.description);
            setService(product.service?._id || 'N/A'); // Asegúrate de usar el ID
            setSupplierType(product.supplierType?._id || 'N/A');
        }
    },[product]);

    const submitHandler=async(e)=>{
        e.preventDefault();
        const updatedProduct={
            productId,
            name,
            price,
            image,
            brand,
            category,
            description,
            service,
            supplierType
        };

        const result= await updateProduct(updatedProduct);
        if(result.error){
            toast.error(result.error);

        }else{
            toast.success('Product updated');
            navigate('/admin/productlist');
        }
    }
    const uploadFileHandler=async(e)=>{
        const formData=new FormData();
        formData.append('image', e.target.files[0]);
        try{
            const res=await uploadProductImage(formData).unwrap();
            toast.success(res.image);
            setImage(res.image);
        }catch(err){
            toast.error(err?.data?.message||err.error);
        }
    }
    return (
    <>
    <Link to='/admin/productlist' className="btn btn-light my-3">
        Go back
    </Link>
    <FormContainer>
        <h1>Edit Event</h1>
        {loadingUpdate && <Loader/>}

        {isLoading ? <Loader/> 
        : error ? (
        <Message variant='danger'> {error}</Message>
        ):(
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name' className="my-2">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e)=>setName(e.target.value)}>

                        </Form.Control>

                    </Form.Group>
                    <Form.Group controlId='price' className="my-2">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                        type='number'
                        placeholder='Enter price'
                        value={price}
                        onChange={(e)=>setPrice(e.target.value)}>

                        </Form.Control>

                    </Form.Group>

                    <Form.Group controlId='image' className="my-2">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type='text' placeholder="Enter image
                         url" value={image} onChange={(e)=>setImage(e.target.value)}></Form.Control>
                        <Form.Control type='file' label='Choose file' onChange={uploadFileHandler}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='service' className="my-2">
                        <Form.Label>Service Type</Form.Label>
                        <Form.Control as='select' value={service} onChange={(e) => setService(e.target.value)}>
                            {uniqueServiceTypes?.map(s => (
                                <option key={s._id} value={s._id}>{s.type}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='supplierType' className="my-2">
                        <Form.Label>Supplier Type</Form.Label>
                        <Form.Control as='select' value={supplierType} onChange={(e) => setSupplierType(e.target.value)}>
                            {uniqueSupplierCategories?.map(st => (
                                <option key={st._id} value={st._id}>{st.category}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='description' className="my-2">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter description'
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}>

                        </Form.Control>

                    </Form.Group>

                    <Button
                    type='submit'
                    variant='primary'
                    className='my-2'>
                    Update
                    </Button>
                    
                </Form>
            )}
    </FormContainer>
    </>
    )
}

export default ProductEditScreen