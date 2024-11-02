import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

function OrderTable({ orders, onClick }) {
  if (orders.length === 0) {
    return (
      <Typography variant="body3" mt={2} ml={2}>
        No orders in this category.
      </Typography>
    );
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography variant="nav">Order ID</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="nav">Total Items</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="nav">Total Price</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="nav">Status</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="nav">Date</Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody className="orders-list">
        {orders.map((order) => (
          <TableRow
            className="order-item"
            data-id={order._id}
            key={order._id}
            onClick={() => onClick(order)}
            style={{ cursor: 'pointer' }}
          >
            <TableCell>
              <Typography variant="text1">{order._id}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="text1" ml={6}>
                {order.totalQuantity}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="text1" ml={3}>
                ${' '}
                {order.finalPrice.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="text1">{order.status}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="text1">
                {new Date(order.orderDate).toLocaleDateString()}
              </Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default OrderTable;
