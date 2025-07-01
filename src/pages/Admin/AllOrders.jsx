import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { getAllOrders } from "../../services/Order.service";
import { Table } from "flowbite-react";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const fetchOrders = await getAllOrders();
        console.log(fetchOrders);
        console.log(fetchOrders.length);
        setOrders(fetchOrders);
      } catch (e) {
        console.log(e);
      }
    };
    getOrders();
  }, []);

  return (
    <div className="mt-7">
      <Helmet>All Orders</Helmet>
      <div className="p-4">
        <div className="p-4">All Orders</div>
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Order_ID</Table.HeadCell>
              <Table.HeadCell>razorpay_order_id</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
              <Table.HeadCell>Payment_Status</Table.HeadCell>
              <Table.HeadCell>UserID</Table.HeadCell>
              <Table.HeadCell>CreatedDate</Table.HeadCell>
              
            </Table.Head>
            <Table.Body>
              {orders.map((order, index) => (
                <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{order.orderId}</Table.Cell>
                  <Table.Cell>{order.razorPayOrderId}</Table.Cell>
                  <Table.Cell>{order.amount/100}</Table.Cell>
                  <Table.Cell>{order.pmtStatus}</Table.Cell>
                  <Table.Cell>{order.userId}%</Table.Cell>
                  <Table.Cell>
                    {new Date(order.createDate).toLocaleDateString()}
                  </Table.Cell>
                  
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
