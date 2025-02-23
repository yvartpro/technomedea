import React from 'react'
import {
  Box,
  Container,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  useTheme,
  useMediaQuery,
  Button,
  Slide,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const Cart = ({ cartItems, onClose, onRemoveFromCart, onUpdateQuantity, open }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const subtotal = React.useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  },[cartItems])//Memoizing calculate, just re run when items change


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
          <Box className="rebuy-cart__flyout-actions">
            <Button variant="contained" className="rebuy-cart__checkout-button block" sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                <LocalShippingIcon /> 
                Paiement sécurisé
              </Box>
            </Button>
          </Box>
        </Box>
      </Box>
      <Box className="rebuy-cart__background"></Box>
    </Box>
    </Slide>
  )
}

export default Cart