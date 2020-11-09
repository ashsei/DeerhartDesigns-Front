import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart, removeItem } from './CartHelpers';
import Card from './Card';
import Checkout from './Checkout';

const Cart = () => {
    const [items, setItems] = useState([])
    const [run, setRun] = useState(false)

    useEffect(() => {
        setItems(getCart())
    }, [run])

    const showItems = items => {
        return (
            <div>
                <h2>Your cart has {`${items.length}`} items.</h2>
                <hr />
                {items.map((product, index) => (
                    (<Card 
                        key={index} 
                        product={product} 
                        showAddToCartButton={false}
                        cartUpdate={true}
                        showRemoveProductButton={true}
                        setRun={setRun}
                        run={run}
                    />)
                ))}
            </div>
        )
    }

    const noItems = () => (
        <h2>Your cart is empty. <br/> <Link to="/shop">Continue Shopping</Link></h2>
    )

    return (
        <Layout title="Deerhart Designs" description="Your Deerhart Designs Cart" className="container-fluid">
            <div className="row">
                <div className="col-6">
                    {items.length > 0 ? showItems(items) : noItems()}
                </div>
                <div className="col-6">
                    <h2 className="mb-4">Your Cart Summary</h2>
                    <hr />
                    <Checkout products={items} />
                </div>
            </div>
        </Layout>
    )
}

export default Cart;