import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Order from './Order';
import { io } from 'socket.io-client';

const Orders = () => {
    const [orders, setOrders] = useState([])
    useEffect(() => {
        const socket = io('ws://localhost:5000')
        socket.on('connection', () => {
            console.log("Connected with socket")
        })
        socket.on('order-added', (newOrders) => {
            setOrders(newOrders)
        })
        socket.on('message', (message) => {
            console.log(message)
        })
        socket.on('disconnect', () => {
            console.log("Socket Disconnected")
        })
    }, [])

    useEffect(() => {
        const getOrders = async () => {
            const response = await axios.get('http://localhost:5000/orders')
            const orderData = response.data
            setOrders(orderData)
        }

        getOrders()
    }, [])

    return (
        <div className="orders-list">
            {orders && orders.length > 0 && orders.map(order => {
                return (
                    <div key={order._id}>
                        <Order order={order}/>
                    </div>
                )
            })}
        </div>
    )
}

export default Orders
