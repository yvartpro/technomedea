import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, List, ListItem, ListItemAvatar, Avatar,  ListItemText,  useTheme, 
  useMediaQuery, Button, Slide, TextField,  Alert, styled } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Input from '@mui/material/Input';

const Cart = ({ cartItems, onClose, onRemoveFromCart, onUpdateQuantity, open, clearCart }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const subtotal = React.useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  //New states
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [receipt, setReceipt] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState(null);
  const [msg, setMsg] = useState('');
  const [sapor, setSapor] = useState('');
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMsg('');
    setSapor('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('address', address);
    formData.append('receipt', receipt);
    formData.append('phone', phone);
    formData.append('photo', photo);
    formData.append('items', JSON.stringify(cartItems));

    try {
      const response = await fetch('https://technomedea.com/backend/buy.php', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      console.log(data)
      if (data.success) {
        setMsg(data.message);
        setSapor('');
        onClose();
        clearCart()
      } else {
        setSapor(data.error || 'An error occurred during purchase.');
        setMsg('');
      }
    } catch (error) {
      console.error("Purchase failed:", error);
      setSapor(error.message || 'An error occurred during purchase.');
      setMsg('');
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    setPhoto(file)
  }
  return (
    <Slide direction="left" in={open} mountOnEnter unmountOnExit>
      <Box
        role="dialog"
        aria-modal="true"
        aria-labelledby="SmartCart_title"
        className="rebuy-cart"
        sx={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: isMobile ? '100%' : '400px',
          height: '100%',
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2),
          overflowY: 'auto',
          zIndex: 1301, // Above most other elements
        }}
      >
        <Box className="rebuy-cart__flyout">
          <Box className="rebuy-cart__flyout-header" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography id="SmartCart_title" variant="h6" component="h2">
              My Cart
            </Typography>
            <IconButton aria-label="Close Cart" onClick={onClose}>
              X
            </IconButton>
          </Box>

          <Box className="rebuy-cart__flyout-body">
            <Box className="rebuy-cart__progress-bar-container above" sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                  <Typography variant="body2" sx={{ fontWeight: 550 }}>Livraison Gratuite</Typography>
                </Box>
                <Typography variant="body2" color="textSecondary">🎉 Félicitations! Vous avez débloqué la <span style={{ fontWeight: 550 }}>LIVRAISON GRATUITE !</span></Typography>
              </Box>
            </Box>

            <Box className="rebuy-cart__flyout-content has-items">
              <List className="rebuy-cart__flyout-items" sx={{ p: 0 }}>
                {cartItems.map((item) => (
                  <ListItem key={item.id} alignItems="flex-start" sx={{ py: 1 }}>
                    <ListItemAvatar>
                      <Avatar alt={item.title} src={`https://technomedea.com/${item.image}`} sx={{ width: 50, height: 50 }} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                          {item.title}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <IconButton aria-label="Decrease quantity" size="small" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>
                            <RemoveIcon />
                          </IconButton>
                          <Typography variant="body2" sx={{ mx: 1 }}>
                            {item.quantity}
                          </Typography>
                          <IconButton aria-label="Increase quantity" size="small" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
                            <AddIcon />
                          </IconButton>
                        </Box>
                      }
                    />
                    <Box sx={{ textAlign: 'right' }}>
                      <IconButton aria-label="Supprimer" onClick={() => onRemoveFromCart(item.id)}>
                        <DeleteIcon />
                      </IconButton>
                      <Typography variant="body2" sx={{ fontWeight: 550 }}>
                        {(item.price * item.quantity).toFixed(2)} $
                      </Typography>
                    </Box>
                  </ListItem>
                ))}
              </List>

               {cartItems.length === 0 && (
                 <Typography variant="body1" sx={{p:2}}>Your cart is empty.</Typography>
               )}
               //Recommendations
          </Box>

          <Box className="rebuy-cart__progress-bar-container below"></Box>
        </Box>

        <Box className="rebuy-cart__flyout-footer" sx={{ mt: 3 }}>
          {/* Flyout Apps - for future integrations */}
          <Box className="rebuy-cart__flyout-apps" data-app-target="above_subtotal" />

          <Box className="rebuy-cart__flyout-subtotal" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1">Sous-total ({cartItems.length} articles):</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{subtotal.toFixed(2)} $</Typography>
          </Box>

          <Box data-app-target="below_subtotal" />
          {isClient ? (
            <Box className="rebuy-cart__flyout-actions">
              <Typography variant="subtitle1">Confirmer le paiement:</Typography>
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
                <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{ mb: 1 }}
                />
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  sx={{ mb: 1 }}
                />
                <TextField
                  label="Receipt Number"
                  variant="outlined"
                  fullWidth
                  required
                  value={receipt}
                  onChange={(e) => setReceipt(e.target.value)}
                  sx={{ mb: 1 }}
                />
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  sx={{ mb: 1 }}
                />
                <Input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="photo"
                    name="photo"
                    type="file"
                    onChange={uploadImage}
                />
                <label htmlFor="photo">
                    <Button variant="contained" component="span">
                        Télécharger bordereau
                    </Button>
                </label>
                <Button
                  variant="contained"
                  className="rebuy-cart__checkout-button block"
                  sx={{ width: '100%', mt: 2 }}
                  type="submit"
                  disabled={loading || !photo}
                >
                  {loading ? 'Paiement en cours...' : 'Paiement sécurisé'}
                </Button>
              </form>
            </Box>
              ) : (
                <Typography variant="body1">Chargement...</Typography>
              )}
        </Box>
      </Box>
      <Box className="rebuy-cart__background"></Box>
      </Box>
    </Slide>
  );
};

export default Cart;