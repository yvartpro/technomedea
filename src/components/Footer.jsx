import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  TextField,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box component="footer" className="site-footer footer-4" role="contentinfo" sx={{ backgroundColor: theme.palette.background.default, py: 5 }}>
      <Box className="footer-top">
        <Container maxWidth="lg" className="container-padd60">
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} xl={3} className="store-location-col">
              <Box className="col-footer">

                <Box className="footer-social">
                  <Box className="groups-block">
                    <Box component="ul" className="social-icons" sx={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', gap: 1 }}>
                      <Box component="li" className="facebook">
                        <IconButton aria-label="Facebook" href="http://facebook.com/notebooktherapy" target="_blank" rel="noopener" sx={{ color: theme.palette.text.secondary }}>
                          <FacebookIcon />
                        </IconButton>
                      </Box>
                       <Box component="li" className="instagram">
                        <IconButton aria-label="Instagram" href="http://instagram.com/notebook_therapy" target="_blank" rel="noopener" sx={{ color: theme.palette.text.secondary }}>
                          <InstagramIcon />
                        </IconButton>
                      </Box>
                      <Box component="li" className="pinterest">
                        <IconButton aria-label="Pinterest" href="https://pinterest.com/notebooktherapy" target="_blank" rel="noopener" sx={{ color: theme.palette.text.secondary }}>
                          <PinterestIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={8} xl={6} className="links-col">
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} className="col-footer">
                  <Typography variant="h6" className="foot-title dropdow-mb" sx={{ fontWeight: 'bold', mb: 2, color: theme.palette.text.primary }}>
                    Information
                  </Typography>
                  <Box component="ul" sx={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                    <Box component="li">
                      <Link href="/blogs/nt" title="Blog" className="foot-link" sx={{ display: 'block', color: theme.palette.text.secondary, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                        Blog
                      </Link>
                    </Box>
                    <Box component="li">
                      <Link href="/pages/about-us" title="À propos de nous" className="foot-link" sx={{ display: 'block', color: theme.palette.text.secondary, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                        À propos de nous
                      </Link>
                    </Box>
                    <Box component="li">
                      <Link href="/pages/sustainability" title="Durabilité" className="foot-link" sx={{ display: 'block', color: theme.palette.text.secondary, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                        Durabilité
                      </Link>
                    </Box>
                    <Box component="li">
                      <Link href="/pages/faqs" title="Livraison et retours" className="foot-link" sx={{ display: 'block', color: theme.palette.text.secondary, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                        Livraison et retours
                      </Link>
                    </Box>
                    <Box component="li">
                      <Link href="/pages/faqs" title="Questions fréquentes" className="foot-link" sx={{ display: 'block', color: theme.palette.text.secondary, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                        Questions fréquentes
                      </Link>
                    </Box>
                    <Box component="li">
                      <Link href="/pages/contact-us" title="Nous contacter" className="foot-link" sx={{ display: 'block', color: theme.palette.text.secondary, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                        Nous contacter
                      </Link>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} className="col-footer">
                  <Typography variant="h6" className="foot-title dropdow-mb" sx={{ fontWeight: 'bold', mb: 2, color: theme.palette.text.primary }}>
                    Boutique
                  </Typography>
                  <Box component="ul" sx={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                    <Box component="li">
                      <Link href="/collections/newest-products" title="Nouveaux produits" className="foot-link" sx={{ display: 'block', color: theme.palette.text.secondary, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                        Nouveaux produits
                      </Link>
                    </Box>
                    <Box component="li">
                      <Link href="/collections/best-selling-products" title="Meilleures ventes" className="foot-link" sx={{ display: 'block', color: theme.palette.text.secondary, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                        Meilleures ventes
                      </Link>
                    </Box>
                    <Box component="li">
                      <Link href="/collections/all-notebooks" title="Cahiers" className="foot-link" sx={{ display: 'block', color: theme.palette.text.secondary, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                        Cahiers
                      </Link>
                    </Box>
                    <Box component="li">
                      <Link href="/collections/bags" title="Sacs" className="foot-link" sx={{ display: 'block', color: theme.palette.text.secondary, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                        Sacs
                      </Link>
                    </Box>
                    <Box component="li">
                      <Link href="/collections/pens" title="Stylos" className="foot-link" sx={{ display: 'block', color: theme.palette.text.secondary, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                        Stylos
                      </Link>
                    </Box>
                     <Box component="li">
                      <Link href="/collections/pencil-cases" title="Étuis à crayons" className="foot-link" sx={{ display: 'block', color: theme.palette.text.secondary, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                        Étuis à crayons
                      </Link>
                    </Box>
                      <Box component="li">
                      <Link href="/collections/stickers" title="Autocollants" className="foot-link" sx={{ display: 'block', color: theme.palette.text.secondary, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                       Autocollants
                      </Link>
                    </Box>
                     <Box component="li">
                      <Link href="/collections/washi-tape" title="Washi Tape" className="foot-link" sx={{ display: 'block', color: theme.palette.text.secondary, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                        Washi Tape
                      </Link>
                    </Box>
                      <Box component="li">
                      <Link href="https://notebooktherapy.com/a/gc/gift-card/" title="Cartes cadeaux" className="foot-link" sx={{ display: 'block', color: theme.palette.text.secondary, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                        Cartes cadeaux
                      </Link>
                    </Box>
                   <Box component="li">
                      <Link href="/collections/trending-products" title="Plus +" className="foot-link" sx={{ display: 'block', color: theme.palette.text.secondary, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                       Plus +
                      </Link>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={12} xl={3} className="newsleter-col">
              <Box className="footer-newsletter">
                <Typography variant="h6" className="newsletter-title foot-title" sx={{ fontWeight: 'bold', mb: 2, color: theme.palette.text.primary }}>
                  Rejoignez-nous pour des offres spéciales & réductions 👇
                </Typography>
                <Box className="newsletter">
                  <Box className="block-content">
                    <Box component="form" method="post" action="/contact" id="contact_form" acceptCharset="UTF-8" className="input-group">
                      <input type="hidden" name="form_type" value="customer" />
                      <input type="hidden" name="utf8" value="✓" />
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Entrez votre adresse e-mail"
                        required
                        name="contact[email]"
                        aria-label="Adresse e-mail"
                        sx={{ mb: 1, backgroundColor: 'white' }}
                      />
                      <Button variant="contained" type="submit" sx={{ width: '100%' }}>
                        Soumettre
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;