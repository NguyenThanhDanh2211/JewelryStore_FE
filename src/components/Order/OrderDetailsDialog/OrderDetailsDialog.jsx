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
          <Typography variant="h2">Order Details</Typography>
        </DialogTitle>
        <DialogContent>
          {order && (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="nav" fontSize="15px">
                Order ID: {order._id}
              </Typography>
              <Typography variant="text">
                Customer: {order.customer.name} - Phone: {order.customer.phone}
              </Typography>
              <Typography variant="text">
                Address: {order.customer.address}
              </Typography>
              <Typography variant="text">
                Total Items: {order.totalQuantity}
              </Typography>
              <Typography variant="text">
                Total Price: ${' '}
                {order.finalPrice.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
              <Typography variant="text">Status: {order.status}</Typography>
              <Typography variant="text">
                Date: {new Date(order.orderDate).toLocaleDateString()}
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
                        <Typography variant="text">
                          {item.productName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography ml={4} variant="text">
                          {item.quantity}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="text">
                          ${' '}
                          {item.price.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
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
