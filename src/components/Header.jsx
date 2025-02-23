import React, { useState, useRef, useEffect } from 'react' // useRef added
import {
  AppBar, Toolbar, Container, Box, IconButton, Typography, List, ListItem, ListItemText,
  Drawer, useMediaQuery, useTheme, Badge, Tooltip, Popover, Grow, Paper, MenuList, MenuItem,
  Divider, TextField
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Link, useNavigate } from 'react-router-dom'

const Header = ({ cartItems, onCartOpen, categories }) => {
  const [anchorElCategory, setAnchorElCategory] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const categoryMenuRef = useRef(null) // Ref for the category menu

  const handleMenuOpen = (event, type) => {
    if (type === 'category') {
      setAnchorElCategory(event.currentTarget)
    }
  }

  const handleMenuClose = (type) => {
    if (type === 'category') {
      setAnchorElCategory(null)
    }
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('') // Clear the input after submitting
    }
  }

  const handleCategoryClick = (catId, catName) => {
    // You can navigate to a category page or filter products here
    console.log(`Category clicked: ID=${catId}, Name=${catName}`)
    // Example: navigate(`/category/${catId}`)
  }

  const menuItems = [
    { label: 'Toutes les catégories 👇', href: '/products', hasSubmenu: true, type: 'category' },
    { label: 'Meilleures ventes', href: '/best-sellers' },
    { label: 'Nouveautés', href: '/new-arrivals', badge: 'Nouveau' },
    { label: 'À propos de nous', href: '/about-us' },
    { label: 'Admin', href: '/dashboard' }, // Added Admin link
  ]

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
            {item.type === 'category' && (
              <List component="div" disablePadding>
                {categories.map(cat => (
                  <ListItem button key={cat.id} onClick={() => {
                    handleCategoryClick(cat.id, cat.name)
                    handleDrawerToggle()  //Close the drawer after selecting category
                  }} sx={{ pl: 4 }}>
                    <ListItemText primary={cat.name} />
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
  )

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
              <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit', marginRight: 2 }}>
                Technomed EA
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexGrow: 1 }}>
                {menuItems.map((item) => (
                  <React.Fragment key={item.label}>
                    <Box
                      onMouseEnter={(e) => item.hasSubmenu ? handleMenuOpen(e, item.type) : null}
                    >
                      <Link to={item.href} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                        <Typography variant="body1" component="span" sx={{ display: 'block', '&:hover': { color: theme.palette.primary.main } }}>
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
                            {categories.map((cat) => (
                              <MenuItem key={cat.id} onClick={() => {
                                handleMenuClose('category')
                                handleCategoryClick(cat.id, cat.name)
                              }} component={Link} to={`/category/${cat.id}`}>
                                {cat.name}
                              </MenuItem>
                            ))}
                          </MenuList>
                        </Paper>
                      </Popover>
                    )}
                  </React.Fragment>
                ))}
              </Box>
                <form onSubmit={handleSearchSubmit}>
                  <TextField
                      size="small"
                      placeholder="Rechercher un produit"
                      variant="outlined"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      InputProps={{
                        endAdornment: (
                            <IconButton type="submit" position="end">
                              <SearchIcon />
                            </IconButton>
                        ),
                      }}
                  />
                </form>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
  )
}

export default Header