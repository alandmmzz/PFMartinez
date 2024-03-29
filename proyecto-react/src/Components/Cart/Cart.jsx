import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { Link } from "react-router-dom";
import cartImage from '../../assets/images/Cart.png';

import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';

export default function Cart() {
    const { cart, removeItem } = useContext(CartContext);
    const [cartList, setCartList] = useState([])

    function calculateTotal() {
        if (cart.length > 0) {
            var priceTotal = 0;
            cart.forEach(product => {
                priceTotal += product.price * product.quantity
            });
            console.log(priceTotal);
        }
        return priceTotal
    }

    useEffect(() => {
        setCartList(cart)
    }, [cartList])

    return (
        <div>
            <div className='row ps-5 pe-5 pt-2 w-100'>
                <div className='col-8'>
                    <Card className='rounded-4 border-0' style={{ width: '50rem' }}>
                        <Card.Header className='fs-5 fw-semibold'>Listado de productos</Card.Header>
                        <ListGroup className="m-3">
                            {cart.map((product) => (
                                <ListGroup.Item key={product.id}>
                                    <div className='row'>
                                        <div className='col-2'>
                                            <img src={product.image} alt="" width="100px" height="100px" />
                                        </div>
                                        <div className='col-6'>
                                            <p className='fw-semibold mt-2'>
                                                {product.title}
                                            </p>
                                            <div className="me-auto">
                                                <Link to={`/item/${product.id}`} className="">
                                                    <span className='link-primary me-2'>Editar</span>
                                                </Link>
                                                <a className='link-primary' onClick={() => removeItem(product.id)}>Eliminar</a>
                                            </div>
                                        </div>
                                        <div className='col-2 fs-6 d-flex align-items-center'>
                                            <p className='text-center mt-2'>
                                                Cantidad: {product.quantity}
                                            </p>
                                        </div>
                                        <div className='col-2 fs-5 d-flex align-items-center'>
                                            <p className='fw-semibold text-center mt-2'>
                                                ${product.price * product.quantity}
                                            </p>
                                        </div>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card>
                </div>
                <div className='col-4 d-flex justify-content-center'>
                    <Card className='rounded-4 border-0' style={{ width: '20rem' }}>
                        <Card.Header className='fs-5 fw-semibold'>Resumen de compra</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <p className='mt-2'>Productos: ${calculateTotal()}</p>
                                <p>Envío: $0.00</p>
                                <p className='fw-bold fs-4 mt-2'>Total: ${calculateTotal()}</p>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Link to={`/checkout`} className="text-reset d-flex justify-content-center">
                                    <button type="button" className="btn btn-dark position-relative rounded-pill mt-2">
                                        <span>Finalizar compra</span>
                                    </button>
                                </Link>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </div>
            </div>
        </div>
    )
}
