import React from 'react';
import { Box, Container, IconButton, useMediaQuery, useTheme, Link, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import desktopBanner from '../assets/banner.png'
import mobileBanner from '../assets/banner.png'

const Banner = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const bannerHeight = isMobile ? '50vh' : '30vh';
  const arrowColor = '#707979';
  const arrowSize = isMobile ? 'small' : 'medium';

  return (
    <Box
      id="shopify-section-16063634864aa05c84"
      className="shopify-section home-slideshow-sections"
      sx={{
        marginTop: '50px',
        position: '',
        overflow: 'hidden',
        paddingBottom: theme.spacing(isMobile ? 0 : 2),
        backgroundColor: '#f0f8ff',
      }}
    >
      <Container maxWidth="xl" sx={{ padding: 0 }}>
        <Box className="row" sx={{ display: 'flex', width: '100%' }}>
          <Box className="no-padd col-12 init-slider" sx={{ width: '100%' }}>
            <Box className="slideshow" data-auto-video="true" data-arrows="true" sx={{ position: 'relative' }}>
              <Box className="item slide-active" id="block-dda54000-af49-4670-8937-b145b2d25b6d" data-index="1">
                <Box className="images-contain">
                  {/* Desktop Banner */}
                  <Box className="adaptive_heights slide-pc" sx={{ display: isMobile ? 'none' : 'block', paddingTop: '20px', width: '100%' }}>
                    <Link href="/promotion/medical">
                      <img
                        src={desktopBanner}
                        alt="Équipement Médical"
                        style={{
                          width: '100%',
                          display: 'block',
                          objectFit: 'cover',
                          height: bannerHeight,
                        }}
                      />
                    </Link>
                  </Box>

                  {/* Mobile Banner */}
                  <Box className="adaptive_height slide-mobile" sx={{ display: isMobile ? 'block' : 'none', paddingTop: '104.121110176619%', position: 'relative', width: '100%' }}>
                    <Link href="/promotion/medical">
                      <img
                        src={mobileBanner}
                        alt="Équipement Médical"
                        style={{
                          width: '100%',
                          height: '100%',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          objectFit: 'cover',
                        }}
                      />
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;