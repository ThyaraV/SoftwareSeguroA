import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/formContainer';
import { toast } from 'react-toastify';
import { useGetSupplierDetailsQuery, useUpdateSupplierMutation , useUploadSupplierImageMutation} from '../../slices/supplierApiSlice';
import { useGetSupplierTypesQuery } from "../../slices/supplierTypesApiSlice";

const SupplierEditScreen = () => {
  const { id: supplierId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [ratings, setRatings] = useState(0);
  const [description, setDescription] = useState('');
  const [supplierType, setSupplierType] = useState('');

  const { data: supplier, isLoading, error } = useGetSupplierDetailsQuery(supplierId);
  const [updateSupplier, { isLoading: isLoadingUpdate }] = useUpdateSupplierMutation();
  const[uploadSupplierImage,{isLoading:loadingUpload}]=useUploadSupplierImageMutation();

  const { data: supplierTypes } = useGetSupplierTypesQuery();

  const uniqueSupplierCategories = Array.from(new Set(supplierTypes?.map(type => type.category))).map(category => {
    return supplierTypes.find(type => type.category === category);
});


  useEffect(() => {
    if (supplier) {
      setSupplierType(supplier.supplierType?._id || 'N/A');
      setName(supplier.name);
      setImage(supplier.image);
      setPriceRange(supplier.priceRange);
      setRatings(supplier.ratings);
      setDescription(supplier.description);
    }
  }, [supplier]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateSupplier({
        supplierId,
        supplierType,
        name,
        image,
        priceRange,
        ratings,
        description,
      }).unwrap();
      toast.success('Supplier updated');
      navigate('/admin/supplierlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler=async(e)=>{
    const formData=new FormData();
    formData.append('image', e.target.files[0]);
    try{
        const res=await uploadSupplierImage(formData).unwrap();
        toast.success(res.image);
        setImage(res.image);
    }catch(err){
        toast.error(err?.data?.message||err.error);
    }
}

  return (
    <FormContainer>
      <h1>Edit Supplier</h1>
      {isLoadingUpdate && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='supplierType' className="my-2">
                <Form.Label>Supplier Type</Form.Label>
                    <Form.Control as='select' value={supplierType} onChange={(e) => setSupplierType(e.target.value)}>
                        {uniqueSupplierCategories?.map(st => (
                            <option key={st._id} value={st._id}>{st.category}</option>
                        ))}
                    </Form.Control>
            </Form.Group>

          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='image' className="my-2">
                <Form.Label>Image</Form.Label>
                <Form.Control type='text' placeholder="Enter image
                    url" value={image} onChange={(e)=>setImage(e.target.value)}></Form.Control>
                <Form.Control type='file' label='Choose file' onChange={uploadFileHandler}></Form.Control>
          </Form.Group>

          <Form.Group controlId='priceRange'>
            <Form.Label>Price Range</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter price range'
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='ratings'>
            <Form.Label>Ratings</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter ratings'
              value={ratings}
              onChange={(e) => setRatings(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              rows={4}
              placeholder='Enter description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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

export default SupplierEditScreen;
