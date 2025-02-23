import React from 'react'
import { Box, Drawer,List, ListItem, ListItemText, ListItemIcon, Toolbar, Typography,Divider } from '@mui/material'
import { Dashboard as DashboardIcon, AddBox as AddBoxIcon, List as ListIcon } from '@mui/icons-material'
import { Outlet, Link } from 'react-router-dom'

const drawerWidth = 240

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {[
            { text: 'Dashboard', icon: <DashboardIcon />, to: '/dashboard' },
            { text: 'Ajouter Catégorie', icon: <AddBoxIcon />, to: '/dashboard/add-category' },
            { text: 'Ajouter Produit', icon: <AddBoxIcon />, to: '/dashboard/add' },
            { text: 'Liste des Produits', icon: <ListIcon />, to: '/dashboard/product-list' },
            { text: 'Liste des Commandes', icon: <ListIcon />, to: '/dashboard/orders' },
          ].map((item, index) => (
            <ListItem button key={item.text} component={Link} to={item.to}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: `calc(100% - ${drawerWidth}px)` }}
      >
        <Toolbar /> {/*  So content doesn't go under AppBar */}
        <Outlet /> {/* Content of child routes will be rendered here */}
      </Box>
    </Box>
  )
}

export default Dashboard