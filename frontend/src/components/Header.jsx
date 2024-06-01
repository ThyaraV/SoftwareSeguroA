import { useNavigate } from 'react-router-dom';
import {Badge,Navbar,Nav,Container, NavDropdown} from 'react-bootstrap'
import {FaShoppingCart,FaUser,FaListUl,FaAward} from 'react-icons/fa';
import logo from "../assets/logo.png";
import {LinkContainer} from 'react-router-bootstrap';
import { useSelector,useDispatch} from 'react-redux';
import {useLogoutMutation} from '../slices/usersApiSlice.js';
import {logout} from '../slices/authSlice.js';



const Header = () => {
    const {cartItems}=useSelector((state)=>state.cart);
    console.log(cartItems);
    const {userInfo}=useSelector((state)=>state.auth);
    
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const[logoutApiCall]=useLogoutMutation();

    const logoutHandler=async()=>{
        try{
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');

        }catch(err){
            console.log(err);
        }
    }
    return (
    <header>
        <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand >
                    <img src={logo} alt="FestivityFinder"/>
                        FestivityFinder
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-control="basic-navbar-nav"/>
                <Navbar.Collapse id="basic.navbar-nav">
                    <Nav className="ms-auto">
                        <LinkContainer to='/filter'>
                        <Nav.Link><FaListUl/>Filter
                        </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/recomendation'>
                        <Nav.Link><FaAward />Recomendation
                        </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/sScreen'>
                        <Nav.Link><FaListUl/>Supplier
                        </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/cart'>
                        <Nav.Link><FaShoppingCart/>Cart
                               {
                                cartItems.length >0 && (
                                        <Badge pill bg='success' style={{marginLeft:'Spx'}}>
                                            {cartItems.reduce((a,c)=>a+c.qty,0)}
                                        </Badge>
                                )
                               } 
                        </Nav.Link>
                        </LinkContainer>
                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ):(
                            <LinkContainer to='/login'>
                            <Nav.Link href='/login'><FaUser/>Sign in
                            </Nav.Link>
                            </LinkContainer>
                        )}
                        {userInfo && userInfo.isAdmin &&(
                            
                        <NavDropdown title="Admin" id='adminmenu'>
                            <LinkContainer to='/admin/orderlist'>
                                <NavDropdown.Item>Orders</NavDropdown.Item>
                            </LinkContainer>    
                            <LinkContainer to='/admin/productlist'>
                                <NavDropdown.Item>Products</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to='/admin/userlist'>
                                <NavDropdown.Item>Users</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to='/admin/servicelist'>
                                <NavDropdown.Item>Services</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to='/admin/suppliertypelist'>
                                <NavDropdown.Item>SupplierTypes</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to='/admin/supplierlist'>
                                <NavDropdown.Item>Supplier</NavDropdown.Item>
                            </LinkContainer>
                            
                        </NavDropdown>
                        )}
                        
                    </Nav>
                </Navbar.Collapse>
            
            </Container>
        </Navbar>
    </header>
  )
}

export default Header