import React, { useEffect, useState } from 'react';
import {
  Typography,
  CircularProgress,
  Tabs,
  Tab,
  styled,
  Stack,
} from '@mui/material';
import { cancelOrder, getAllOrder } from '~/services/orderService';
import OrderDetailsDialog from './OrderDetailsDialog';
import OrderTable from './OrderTable';

const UserOrdersContainer = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  minHeight: '500px',
  padding: '20px 70px',
  backgroundColor: '#f5f5f5',
}));

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [cancelError, setCancelError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await getAllOrder(token);

        setOrders(response.orders);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId, orderStatus) => {
    if (orderStatus !== 'pending') {
      setCancelError('Only pending orders can be canceled.');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      await cancelOrder(token, orderId);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: 'Canceled' } : order
        )
      );
      setCancelError('');
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  };

  const handleOpenOrderDetails = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const filteredOrders = (status) => {
    return orders.filter((order) => order.status === status);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <UserOrdersContainer>
      <Typography variant="h1" gutterBottom>
        My Orders
      </Typography>

      {/* Tabs */}
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        sx={{
          '.MuiTabs-indicator': {
            backgroundColor:
              tabIndex === 0 ? '#db9662' : tabIndex === 1 ? 'red' : 'green',
          },
        }}
      >
        <Tab
          disableRipple
          label={
            <Typography
              variant="text"
              sx={{
                color: tabIndex === 0 ? '#db9662' : 'rgb(154, 154, 154)',
              }}
            >
              Pending/Shipping
            </Typography>
          }
        />
        <Tab
          className="cancelled-orders-tab"
          disableRipple
          label={
            <Typography
              variant="text"
              sx={{
                color: tabIndex === 1 ? 'red' : 'rgb(154, 154, 154)',
              }}
            >
              Canceled Order
            </Typography>
          }
        />
        <Tab
          disableRipple
          label={
            <Typography
              variant="text"
              sx={{
                color: tabIndex === 2 ? 'green' : 'rgb(154, 154, 154)',
              }}
            >
              Delivered Orders
            </Typography>
          }
        />
      </Tabs>

      {tabIndex === 0 && (
        <OrderTable
          orders={filteredOrders('pending').concat(
            filteredOrders('processing'),
            filteredOrders('shipped')
          )}
          onClick={handleOpenOrderDetails}
        />
      )}

      {tabIndex === 1 && (
        <OrderTable
          orders={filteredOrders('canceled')}
          onClick={handleOpenOrderDetails}
        />
      )}

      {tabIndex === 2 && (
        <OrderTable
          orders={filteredOrders('delivered')}
          onClick={handleOpenOrderDetails}
        />
      )}

      {cancelError && (
        <Typography variant="body1" color="error">
          {cancelError}
        </Typography>
      )}

      <OrderDetailsDialog
        open={open}
        onClose={handleClose}
        order={selectedOrder}
        onCancel={handleCancelOrder}
      />
    </UserOrdersContainer>
  );
};

export default UserOrders;
