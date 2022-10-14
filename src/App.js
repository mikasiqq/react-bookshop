import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { sendCartData, getCartData } from './store/cart-actions';
import Notification from './components/UI/Notification';

let isInitial = true

function App() {
  const showCart = useSelector(state => state.cart.showCart)
  const items = useSelector(state => state.cart.items)
  const changed = useSelector(state => state.cart.changed)
 
  const totalQuantity = useSelector(state => state.cart.totalQuantity)
  const notification = useSelector(state => state.cart.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCartData())
  }, [dispatch])

  useEffect(() => {
    if (isInitial) {
      isInitial = false
      return
    }

    if (changed) {
      dispatch(sendCartData(items, totalQuantity))
    }
    
  }, [items, totalQuantity, dispatch, changed])

  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
