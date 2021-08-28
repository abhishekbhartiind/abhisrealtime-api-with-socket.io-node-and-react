import React from 'react'

const Order = props => {
    const { order } = props
    return (
        <div className="order">
            <p>{order.customer}</p>
            <p>{order.price}</p>
            <p>{order.address}</p>
        </div>
    )
}

export default Order
