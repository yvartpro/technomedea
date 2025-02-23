import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';

import { CheckCircle as CheckCircleIcon, Cancel as CancelIcon, 
         Visibility as VisibilityIcon, MoreVert as MoreVertIcon} from '@mui/icons-material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
}));

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // State to hold the image URL
  const [msg, setMsg] = useState('');
  const [sapor, setSapor] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
    const handleClick = (event,invoice) => {
      setAnchorEl(event.currentTarget);
      setSelectedInvoice(invoice)
    };
    const handleClose = () => {
      setAnchorEl(null);
      setSelectedInvoice(null)
    };
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    fetchOrderData();
  }, []);

  const fetchOrderData = async () => {
    try {
      const resp = await fetch('https://technomedea.com/backend/fetch/orders.php');
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      const res = await resp.json();
      setOrders(res.orders);
      setInvoices(res.invoice);
    } catch (error) {
      console.error(error);
      setSapor(error.message || 'Failed to fetch orders.');
    }
  };

  const handleViewImage = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };
  // Function to update invoice status
  const updateInvoiceStatus = async (invoiceId, status) => {
      try {
      const resp = await fetch('https://technomedea.com/backend/update_invoice_status.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invoice_id: invoiceId, status: status }),
      });
      if (!resp.ok) throw new Error(resp.statusText);

      const res = await resp.json();
      console.log(res)
      if (res.success) {
        setMsg(res.message);
        // Update the invoices state and remove the cancelled invoice
        setInvoices((prevInvoices) => {
          if (status === 'cancelled') {
            return prevInvoices.filter((invoice) => invoice.id !== invoiceId);
          } else {
            return prevInvoices.map((invoice) =>
              invoice.id === invoiceId ? { ...invoice, status: status } : invoice
            );
          }
        });
        setSapor('');
      } else {
        throw new Error(res.error || 'Failed to update invoice status.');
      }
    } catch (error) {
      console.error(error);
      setSapor(error.message || 'Failed to update invoice status.');
    }
  };

  const groupedOrders = {};
  orders.forEach(order => {
    if (!groupedOrders[order.invoice_id]) {
      groupedOrders[order.invoice_id] = [];
    }
    groupedOrders[order.invoice_id].push(order);
  });

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Commandes
      </Typography>
      {sapor && (
        <Alert severity="error" sx={{ mb: 1 }}>
          {sapor}
        </Alert>
      )}
      {msg && (
        <Alert severity="success" sx={{ mb: 1 }}>
          {msg}
        </Alert>
      )}
      <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
        <Table sx={{ minWidth: 700 }} aria-label="order table" stickyHeader>
          <TableHead sx={{ backgroundColor: '#f2f2f2' }}>
            <TableRow>
              <StyledTableCell># Facture</StyledTableCell>
              <StyledTableCell>Nom et prénom</StyledTableCell>
              <StyledTableCell>Articles (QT x P.U)</StyledTableCell>
              <StyledTableCell>P.T Facture</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => (
              <React.Fragment key={invoice.id}>
                <TableRow>
                  <StyledTableCell component="th" scope="row">
                    {invoice.receipt}
                  </StyledTableCell>
                  <TableCell>{invoice.name}</TableCell>
                  <TableCell>
                    {groupedOrders[invoice.id] &&
                      groupedOrders[invoice.id].map((order, index) => (
                        <React.Fragment key={order.id}>
                          {order.prod_name} (<Typography component="span" sx={{ fontWeight: 'bold' }}>{order.quantity}</Typography> x <Typography component="span" sx={{ fontWeight: 'bold' }}>{Number(order.price).toFixed(2)}</Typography>)
                          {index < groupedOrders[invoice.id].length - 1 && (
                            <Divider style={{ margin: '5px 0', borderTop: '1px dashed #ccc' }} />
                          )}
                        </React.Fragment>
                      ))}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>
                    {groupedOrders[invoice.id]
                      ? groupedOrders[invoice.id].reduce((acc, order) => acc + order.quantity * order.price, 0).toFixed(2)
                      : '0.00'}
                  </TableCell>
                  <TableCell>
                    {invoice.image}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="view"
                      onClick={() => handleViewImage(`https://technomedea.com/backend/${invoice.image}`)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <div>
                      <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={(e) => handleClick(e, invoice)}
                      >
                          <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="long-menu"
                        MenuListProps={{
                          'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorEl}
                        open={selectedInvoice !== null && open}
                        onClose={handleClose}
                        PaperProps={{
                          style: {
                            maxHeight: 48 * 4.5,
                            width: '20ch',
                          },
                        }}
                      >
                        <MenuItem onClick={() => {
                                       updateInvoiceStatus(invoice.id, 'Valide');handleClose()
                                     }}>
                          <ListItemIcon>
                            <CheckCircleIcon fontSize="small" />
                          </ListItemIcon>
                            <Typography variant="body2">
                              Marquer comme OK
                            </Typography>
                        </MenuItem>
                        <MenuItem onClick={() => {
                                       updateInvoiceStatus(invoice.id, 'Annulee');handleClose()
                                     }}>
                          <ListItemIcon>
                            <CancelIcon fontSize="small" />
                          </ListItemIcon>
                            <Typography variant="body2">
                              Annuler
                            </Typography>
                        </MenuItem>
                      </Menu>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow style={{ borderBottom: '2px solid #ddd' }}>
                  <TableCell colSpan={5} /> {/* Separator row after each invoice */}
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal to display the image */}
      <Modal
        open={Boolean(selectedImage)}
        onClose={handleCloseImage}
        aria-labelledby="image-modal-title"
        aria-describedby="image-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'auto',
            maxWidth: '90%',
            maxHeight: '90%',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            outline: 'none',
          }}
        >
          <img src={`${selectedImage}`} alt="Receipt" style={{ display: 'block', maxWidth: '100%', maxHeight: '80vh', margin: 'auto' }} />
        </Box>
      </Modal>
      <Snackbar
        open={!!msg}
        autoHideDuration={6000}
        onClose={() => setMsg('')}
        message={msg}
      />
      <Snackbar
        open={!!sapor}
        autoHideDuration={6000}
        onClose={() => setSapor('')}
        message={sapor}
        severity="error"
      />
    </Box>
  );
};

export default Orders;