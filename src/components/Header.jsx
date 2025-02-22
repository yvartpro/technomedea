import React, { useState, useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  List,
  ListItem,
  ListItemText,
  Drawer,
  useMediaQuery,
  useTheme,
  Badge,
  Tooltip,
  Popover,
  Grow,
  Paper,
  MenuList,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'; // Example
import HealingIcon from '@mui/icons-material/Healing'; // Example
import { Link } from 'react-router-dom';

const Header = ({cartItems, onCartOpen}) => {
  const [anchorElCategory, setAnchorElCategory] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)


  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  
  const handleMenuOpen = (event, type) => {
    if (type === 'category') {
      setAnchorElCategory(event.currentTarget)
    }
  };

  const handleMenuClose = (type) => {
    if (type === 'category') {
      setAnchorElCategory(null);
    }
  };

  const menuItems = [
    { label: 'Toutes les catégories 👇', href: '/products', hasSubmenu: true, type: 'category' },
    { label: 'Meilleures ventes', href: '/best-sellers' },
    { label: 'Nouveautés', href: '/new-arrivals', badge: 'Nouveau' },
    { label: 'Offres spéciales', href: '/offers', badge: 'Limitée' },
    { label: 'À propos de nous', href: '/about-us' },
    { label: 'Contact', href: '/contact' },
  ];

  const categorySubmenu = [
    { label: 'Équipement de diagnostic', href: '/diagnostic' },
    { label: 'Instruments chirurgicaux', href: '/surgical' },
    { label: 'Surveillance des patients', href: '/monitoring' },
    { label: 'Aides à la mobilité', href: '/mobility' },
    { label: 'Fournitures de premiers secours', href: '/first-aid' },
    { label: 'Soins personnels', href: '/personal-care' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 240 }}>
      <List>
        {menuItems.map((item, index) => (
          <React.Fragment key={item.label}>
            <ListItem button component={Link} to={item.href} onClick={handleDrawerToggle}>
              <ListItemText primary={item.label} />
              {item.badge && (
                <Box sx={{ ml: 1 }}>
                  <Typography variant="caption" color="primary" sx={{ fontWeight: 'bold' }}>
                    {item.badge}
                  </Typography>
                </Box>
              )}
            </ListItem>
            {item.subItems && (
              <List component="div" disablePadding>
                {item.subItems.map(subItem => (
                  <ListItem button key={subItem.label} component={Link} to={subItem.href} sx={{ pl: 4 }} onClick={handleDrawerToggle}>
                    <ListItemText primary={subItem.label} />
                  </ListItem>
                ))}
              </List>
            )}
            {index < menuItems.length - 1 && <Divider />}
          </React.Fragment>
        ))}
        <Divider />
        
      </List>
    </Box>
  );

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'white', color: 'black' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>

              <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true,
                }}
              >
                {drawer}
              </Drawer>

              <Box sx={{ flexGrow: 1 }} />
              <Tooltip title="Rechercher">
                <IconButton color="inherit">
                  <SearchIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Panier">
                <IconButton color="inherit" onClick={onCartOpen}>
                  <Badge badgeContent={totalItems} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
              <Box sx={{ display: 'flex', gap: 2, flexGrow: 1 }}>
                {menuItems.map((item) => (
                  <React.Fragment key={item.label}>
                    <Box
                      onMouseEnter={(e) => item.hasSubmenu ? handleMenuOpen(e, item.type) : null}
                      onMouseLeave={(e) => item.hasSubmenu ? handleMenuClose(item.type) : null}
                    >
                      <Link to={item.href} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                        <Typography variant="body1" sx={{ display: 'block', '&:hover': { color: theme.palette.primary.main } }}>
                          {item.label}
                          {item.badge && (
                            <Box sx={{ ml: 1, display: 'inline' }}>
                              <Typography variant="caption" color="primary" sx={{ fontWeight: 'bold' }}>
                                {item.badge}
                              </Typography>
                            </Box>
                          )}
                        </Typography>
                      </Link>
                    </Box>


                    {item.type === 'category' && (
                      <Popover
                        open={Boolean(anchorElCategory)}
                        anchorEl={anchorElCategory}
                        onClose={() => handleMenuClose('category')}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                        TransitionComponent={Grow}
                      >
                        <Paper>
                          <MenuList autoFocusItem>
                            {categorySubmenu.map((subItem) => (
                              <MenuItem key={subItem.label} onClick={() => handleMenuClose('category')} component={Link} to={subItem.href}>
                                {subItem.label}
                              </MenuItem>
                            ))}
                          </MenuList>
                        </Paper>
                      </Popover>
                    )}


                  </React.Fragment>
                ))}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Tooltip title="Rechercher">
                  <IconButton color="inherit">
                    <SearchIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Panier" content={totalItems}>
                  <IconButton color="inherit" onClick={onCartOpen}>
                    <Badge badgeContent={totalItems}>
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;