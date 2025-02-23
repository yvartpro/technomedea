import React, { useState, useEffect, useCallback } from 'react'
import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
  Rating,
  Badge,
  Button,
  CircularProgress,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import { Grid2 } from '@mui/material'

const ProductItemBox = styled(Box)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1),
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
  overflow: 'hidden',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
  },
}))

const ProductGrid = ({ addToCart }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const resp = await fetch('https://technomedea.com/backend/fetch/products.php')
        if (!resp.ok) {
          throw new Error(resp.statusText)
        }
        const res = await resp.json()
        setProducts(res.data)
        setLoading(false)
        console.log(res)
      } catch (sapor) {
        console.error(sapor)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // const handleAddToCart = useCallback((productId) => {
  //   addToCart(productId)
  // }, [addToCart])

  return (
    <Box
      id="shopify-section-e2d414cb-0390-476a-8549-6b4efc59bce8"
      className="shopify-section suppermarket-new-arrivals-sections"
      sx={{ backgroundColor: '#ffffff', paddingTop: '1px', marginBottom: '15px' }}
    >
      <Container maxWidth="lg">
        <Box
          className="suppermarket-new-arrivals new-arrivals-product"
          id="new-arrivals-e2d414cb-0390-476a-8549-6b4efc59bce8"
          data-new-arrivals-product=""
        >
          <Box className="widget-product suppermarket-widget-product">
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
              Les plus récents
            </Typography>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <CircularProgress />
              </Box>
            ) : (
              <Grid2 container rowSpacing={2} columnSpacing={2} className="products-grid" data-products-to-show="16" data-total-products="272" sx={{ mt: 0 }}>
                {products.map((product) => (
                  <Grid2 xs={6} md={4} lg={3} key={product.id} className="grid-item">
                    <ProductItemBox>
                      <Box sx={{ position: 'relative' }}>
                        <Link to={`/products/${product.handle}`} style={{ textDecoration: 'none' }}>
                          <Box
                            component="img"
                            alt={product.title}
                            src={`https://technomedea.com/${product.image}`}
                            sx={{
                              width: '100%',
                              height: '250px',
                              objectFit: 'contain',
                              padding: theme.spacing(0.25),
                              display: 'block',
                            }}
                          />
                        </Link>
                      </Box>
                      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                        <Link to={`/products/${product.handle}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1, fontSize: '14px', textAlign: 'center' }}>
                            {product.title}
                          </Typography>
                        </Link>
                        <Typography>
                          {product.compareAtPrice && (
                            <Typography variant="span" color="textSecondary" sx={{ textDecoration: 'line-through', mr: 1, fontSize: '12px' }}>
                              ${product.compareAtPrice.toFixed(2)}
                            </Typography>
                          )}
                          <Typography variant="span" component="span" sx={{ fontSize: '14px' }}>
                            ${Number(product.price).toFixed(2)}
                          </Typography>
                        </Typography>
                            <Button variant='contained' onClick={() => addToCart(product.id)}>Ajouter au panier</Button>
                      </Box>
                    </ProductItemBox>
                  </Grid2>
                ))} 
              </Grid2>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default ProductGrid