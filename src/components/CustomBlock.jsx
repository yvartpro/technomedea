import React from 'react';
import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';

const CustomBlock = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const sectionStyle = {
    backgroundColor: '#f0f8ff', // Light blue
    marginBottom: '1px',
    display: isMobile ? 'none' : 'block'
  };

  const spanStyle = {
    fontFamily: 'Arial',
    color: '#007bff', // Example: Blue
    backgroundColor: '#e1f5fe', // Very light blue
    padding: '3px 6px',
    fontSize: '0.8rem',
    borderRadius: '3px'
  };

  const titleStyle = {
    fontFamily: 'Arial',
    fontWeight: 600,
    fontSize: '1.75rem', // Slightly Larger
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    color: '#212529', // Dark grey
    textAlign: 'center'
  };

  const descriptionStyle = {
    marginBottom: theme.spacing(3),
    textAlign: 'center',
    color: '#6c757d', // Medium grey
    fontSize: '1.1rem',
    lineHeight: 1.6
  };

  return (
    <Box
      id="shopify-section-1633701512b5d69843"
      className="shopify-section home-custom-block-page-sections"
      sx={sectionStyle}
    >
      <Box
        className="home-custom-block-page"
        id="custom-block-page-1633701512b5d69843"
      >
        <Container maxWidth="lg">
          <Box className="row" sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box className="col-12">
              <Box sx={{textAlign: 'center'}}>
                <Typography variant="body2" component="span" style={spanStyle}>
                   NOUVELLE COLLECTION  
                </Typography>
              </Box>
              <Typography variant="h6" style={titleStyle}>
                Solutions Innovantes pour la Santé
              </Typography>
              <Typography variant="body1" style={descriptionStyle}>
                Découvrez notre gamme complète d'équipements médicaux de pointe.
                Des diagnostics précis aux traitements innovants, nous sommes votre partenaire pour une meilleure santé.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};



export default CustomBlock;