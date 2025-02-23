import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  Snackbar,
  Alert,
  styled,
  IconButton,
  Modal,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { CheckCircle as CheckCircleIcon, Cancel as CancelIcon, Visibility as VisibilityIcon } from '@mui/icons-material';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [msg, setMsg] = useState('');
  const [sapor, setSapor] = useState('');

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
       if (res && res.orders && Array.isArray(res.orders) && res.invoice && Array.isArray(res.invoice)) {
        setOrders(res.orders);
        setInvoices(res.invoice);
      } else {
        throw new Error("Invalid data format from API");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setSapor(error.message || 'Failed to fetch orders.');
    }
  };

  const handleViewImage = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  const updateInvoiceStatus = async (invoiceId, status) => {
    try {
      const resp = await fetch('/backend/update_invoice_status.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invoice_id: invoiceId, status: status }),
      });
      if (!resp.ok) throw new Error(resp.statusText);

      const res = await resp.json();
      if (res.success) {
        setMsg(res.message);
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

  const columns = useMemo(() => [
    { field: 'id', headerName: 'Invoice ID', width: 80 },
    { field: 'name', headerName: 'Nom et Prénom', width: 200 },
    {
      field: 'items',
      headerName: 'Articles (QT x P.U)',
      width: 400,
      renderCell: (params) => {
        const invoiceOrders = orders.filter(order => order.invoice_id === params.row.id);
        return (
          <List dense>
            {invoiceOrders.map((order) => {
              // Check if order and order.photo are defined
              if (!order || !order.photo) {
                return <ListItem key="missing-order">Missing Order Data</ListItem>; // Or some other placeholder
              }
              return (
                <ListItem key={order.id}>
                  <ListItemText
                    primary={`${order.prod_name} (${order.quantity} x ${Number(order.price).toFixed(2)})`}
                  />
                  <IconButton
                    aria-label="view"
                    onClick={() => handleViewImage(`/backend/${order.photo}`)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </ListItem>
              );
            })}
          </List>
        );
      },
      sortable: false,
      filterable: false,
    },
    {
      field: 'total',
      headerName: 'P.T Facture',
      width: 120,
      valueGetter: (params) => {
        const invoiceOrders = orders.filter(order => order.invoice_id === params.row.id);
        const total = invoiceOrders.reduce((acc, order) => acc + order.quantity * order.price, 0);
        return total.toFixed(2);
      },
    },
  ], [orders, handleViewImage]);

  const rows = useMemo(() => {
    return invoices.map(invoice => ({
      ...invoice,
      id: String(invoice.id),
    }));
  }, [invoices]);

  return (
    <Box sx={{ height: 700, width: '100%' }}>
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
      <DataGrid
        rows={rows}
        columns={columns}
        disableSelectionOnClick
        getRowId={(row) => row.id}
        sx={{
          '& .MuiDataGrid-row:nth-child(odd)': {
            backgroundColor: (theme) => theme.palette.action.hover,
          },
        }}
      />

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