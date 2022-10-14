import axios from "axios"
import { cartActions } from "."

export const getCartData = () => {
    return async (dispatch) => {
        const getData = async () => {
            const response = await axios.get('https://react-http-df453-default-rtdb.europe-west1.firebasedatabase.app/cart.json')
            const data = await response.data

            return data
        }

        try {
            const cartData = await getData()

            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity
            }))
            dispatch(cartActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'fetched  cart data successfully',
            }))
        } catch (error) {
            dispatch(cartActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'fetch cart data failed',
            }))
        }
    }
}

export const sendCartData = (items, totalQuantity) => {
    return async (dispatch) => {
        dispatch(
            cartActions.showNotification({
                status: 'pending',
                title: 'Sending!',
                message: 'sending cart data',
            })
        )
        const sendRequest = async () => {
            await axios.put('https://react-http-df453-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
                items,
                totalQuantity
            })

            // if (!response.ok) {
            //   throw new Error ('some error')
            // }
        }

        try {
            await sendRequest()
            dispatch(cartActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'sent cart data successfully',
            }))
        } catch (error) {
            dispatch(cartActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'sending cart data failed',
            }))
        }

    }
}