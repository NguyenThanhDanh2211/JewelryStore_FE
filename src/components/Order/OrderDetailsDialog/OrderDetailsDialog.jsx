import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

function OrderDetailsDialog({ open, onClose, order, onCancel }) {
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        className="order-detail"
      >
        <DialogTitle>
          <Typography>Order Details</Typography>
        </DialogTitle>
        <DialogContent>
          {order && (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body3">Order ID: {order._id}</Typography>
              <Typography variant="body2">
                Customer: {order.customer.name} - Phone: {order.customer.phone}
              </Typography>
              <Typography variant="body2">
                Address: {order.customer.address}
              </Typography>
              <Typography variant="body2">
                Total Items: {order.totalQuantity}
              </Typography>
              <Typography variant="body2">
                Total Price: ${order.finalPrice.toFixed(2)}
              </Typography>
              <Typography variant="body2">Status: {order.status}</Typography>
              <Typography variant="body2">
                Date: {new Date(order.orderDate).toLocaleDateString()}
              </Typography>

              <Typography variant="body3" sx={{ marginTop: 2 }}>
                Items:
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="nav" fontSize={15}>
                        Product Name
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="nav" fontSize={15}>
                        Quantity
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="nav" fontSize={15}>
                        Price
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.productId}>
                      <TableCell>
                        <Typography variant="body2">
                          {item.productName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography ml={4} variant="body2">
                          {item.quantity}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          ${item.price.toFixed(2)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          {order && order.status === 'pending' && (
            <Button
              className="cancel-order"
              onClick={() => onCancel(order._id, order.status)}
              variant="single"
              sx={{
                '&:hover': {
                  backgroundColor: 'red',
                  color: 'white',
                },
              }}
            >
              Cancel Order
            </Button>
          )}
          <Button className="close-dialog" onClick={onClose} variant="single">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default OrderDetailsDialog;
