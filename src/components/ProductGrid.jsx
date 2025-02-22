import React from 'react';
import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
  Rating,
  Badge,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Grid2 } from '@mui/material';

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
}));

const ProductGrid = ({addToCart}) => {
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const products = [
    {
      id: 'tools-001',
      handle: 'stethoscope',
      imageUrl: '../backend/img/tools/steto.jpg',
      imageUrl2: '../backend/img/tools/stetho.avif',
      title: 'Stéthoscope Professionnel',
      price: 49.99,
      rating: 4.7,
      ratingCount: 75,
      onSale: false,
      soldOut: false,
      backInStock: true,
    },
    {
      id: 'tools-002',
      handle: 'sphygmomanometer',
      imageUrl: '../backend/img/tools/sphygmomanometer.png',
      imageUrl2: '../backend/img/tools/sphygmomanometer.png',
      title: 'Tensiomètre Numérique',
      price: 39.50,
      rating: 4.5,
      ratingCount: 102,
      onSale: true,
      compareAtPrice: 49.99,
      soldOut: false,
      backInStock: false,
    },
    {
      id: 'tools-003',
      handle: 'otoscope',
      imageUrl: '../backend/img/tools/otoscope.jpg',
      imageUrl2: '../backend/img/tools/otoscope.jpg', // No Alt
      title: 'Otoscope de Diagnostic',
      price: 75.00,
      rating: 4.2,
      ratingCount: 53,
      onSale: false,
      soldOut: false,
      backInStock: false,
    },
    {
      id: 'tools-004',
      handle: 'ophthalmoscope',
      imageUrl: '../backend/img/tools/ophthalmoscope.jpg',
      imageUrl2: '../backend/img/tools/ophthalmoscope.jpg', // No Alt
      title: 'Ophtalmoscope Standard',
      price: 110.00,
      rating: 4.6,
      ratingCount: 38,
      onSale: false,
      soldOut: true,
      backInStock: false,
    },
    {
      id: 'tools-005',
      handle: 'reflex-hammer',
      imageUrl: '../backend/img/tools/reflex-hammer.webp',
      imageUrl2: '../backend/img/tools/reflex-hammer.webp', // No Alt
      title: 'Marteau à Réflexes Neurologiques',
      price: 19.99,
      rating: 4.9,
      ratingCount: 120,
      onSale: false,
      soldOut: false,
      backInStock: false,
    },
     {
      id: 'tools-006',
      handle: 'scale',
      imageUrl: '../backend/img/tools/scale.jpg',
      imageUrl2: '../backend/img/tools/scale.jpg', // No Alt
      title: 'Balance Médicale Professionnelle',
      price: 99.00,
      rating: 4.7,
      ratingCount: 90,
      onSale: false,
      soldOut: false,
      backInStock: true,
    },
     {
      id: 'tools-007',
      handle: 'bod-fat-analyzer',
      imageUrl: '../backend/img/tools/body-fat-analyser.jpg',
      imageUrl2: '../backend/img/tools/body-fat-analyser.jpg', // No Alt
      title: 'Analyseur de Graisse Corporelle',
      price: 120.00,
      rating: 4.1,
      ratingCount: 30,
      onSale: true,
      compareAtPrice: 140.00,
      soldOut: false,
      backInStock: false,
    },
       {
      id: 'tools-008',
      handle: 'ecg',
      imageUrl: '../backend/img/tools/ecg.jpg',
      imageUrl2: '../backend/img/tools/ecg.jpg', // No Alt
      title: 'Électrocardiographe (ECG)',
      price: 1000.00,
      rating: 5.0,
      ratingCount: 10,
      onSale: false,
      soldOut: false,
      backInStock: true,
    },
  
          {
      id: 'tools-009',
      handle: 'toise',
      imageUrl: '../backend/img/tools/toise.jpg',
      imageUrl2: '../backend/img/tools/toise.jpg', // No Alt
      title: 'Toise',
      price: 60.00,
      rating: 3.4,
      ratingCount: 32,
      onSale: false,
      soldOut: false,
      backInStock: false,
    },
  
      {
      id: 'tools-010',
      handle: 'labo',
      imageUrl: '/../backendimg/labo/chemistry.jpg',
      imageUrl2: '../backend/img/labo/chemistry.jpg', // No Alt
      title: 'Chemistry Stuff',
      price: 100.00,
      rating: 4.3,
      ratingCount: 44,
      onSale: false,
      soldOut: false,
      backInStock: true,
    },
  
      {
      id: 'tools-011',
      handle: 'microscope',
      imageUrl: '../backend/img/imaging/microscope.jpg',
      imageUrl2: '../backend/img/imaging/microscope.jpg', // No Alt
      title: 'Microscope ',
      price: 300.00,
      rating: 4.0,
      ratingCount: 12,
      onSale: true,
        compareAtPrice: 400.00,
      soldOut: true,
      backInStock: false,
    },
  
        {
      id: 'tools-012',
      handle: 'well-chair',
      imageUrl: '../backend/img/mobility/well-chair.webp',
      imageUrl2: '../backend/img/mobility/well-chair.webp',
      title: 'Chaise roulante',
      price: 23.32,
      rating: 4.0,
      ratingCount: 21,
      onSale: false,
      soldOut: false,
      backInStock: false,
    },
  ];

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
            <Grid2 container rowSpacing={2} columnSpacing={2} className="products-grid" data-products-to-show="16" data-total-products="272" sx={{ mt: 0 }}>
              {products.map((product) => (
                <Grid2 item xs={6} md={4} lg={3} key={product.id} className="grid-item">
                  <ProductItemBox>
                    <Box sx={{ position: 'relative' }}>
                      {product.soldOut && (
                        <Badge badgeContent="Epuis&eacute;" color="warning" sx={{ position: 'absolute', top: '18px', right: '30px', zIndex: 10, '& .MuiBadge-badge': { fontSize: '0.7rem', px: 1, py: 0.5 } }} />
                      )}
                      {product.backInStock && (
                        <Badge badgeContent="Nouveau" color="primary" sx={{ position: 'absolute', top: '18px', right: '60px', zIndex: 10, '& .MuiBadge-badge': { fontSize: '0.7rem', px: 1, py: 0.5, backgroundColor: theme.palette.success.main } }} />
                      )}
                      <Link href={`/products/${product.handle}`} style={{ textDecoration: 'none' }}>
                        <Box
                          component="img"
                          alt={product.title}
                          src={product.imageUrl}
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
                      <Link href={`/products/${product.handle}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 , fontSize: '14px', textAlign: 'center'}}>
                          {product.title}
                        </Typography>
                      </Link>
                      <Typography>
                        {product.compareAtPrice && (
                          <Typography variant="span" color="textSecondary" sx={{ textDecoration: 'line-through', mr: 1, fontSize: '12px'
                           }}>
                            ${product.compareAtPrice.toFixed(2)}
                          </Typography>
                        )}
                        <Typography variant="span" component="span" sx={{ fontSize: '14px' }}>
                          ${product.price.toFixed(2)}
                        </Typography>
                      </Typography>
                      {product.rating !== null && (
                        <><Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                          <Rating name="read-only" value={product.rating} precision={0.1} readOnly size="small" />
                          <Typography variant="body2" color="textSecondary" sx={{ ml: 0.5 }}>
                            ({product.ratingCount})
                          </Typography>
                        </Box>
                        <Button variant='contaned' disabled={product.soldOut} onClick={() => addToCart(product.id)}>Ajouter au panier</Button></>
                      )}
                    </Box>
                  </ProductItemBox>
                </Grid2>
              ))}
            </Grid2>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductGrid;