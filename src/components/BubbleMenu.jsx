import React from 'react';
import {
  Box,
  Container,
  Link,
  Typography,
  useMediaQuery,
  useTheme,
  Avatar,
} from '@mui/material';

const BubbleMenu = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const bubbleItems = [
    { href: '/diagnostic', imageUrl: '/images/diagnostic.png', title: 'Diagnostic' },
    { href: '/surgical', imageUrl: '/images/surgical.png', title: 'Chirurgical' },
    { href: '/monitoring', imageUrl: '/images/monitoring.png', title: 'Surveillance' },
    { href: '/mobility', imageUrl: '/images/mobility.png', title: 'Mobilité' },
    { href: '/first-aid', imageUrl: '/images/first-aid.png', title: 'Premiers secours' },
    { href: '/personal-care', imageUrl: '/images/personal-care.png', title: 'Soins' },
    { href: '/medical-furniture', imageUrl: '/images/furniture.png', title: 'Mobilier médical' },
    { href: '/infection-control', imageUrl: '/images/infection-control.png', title: 'Contrôle infections' },
    { href: '/orthopedics', imageUrl: '/images/orthopedics.png', title: 'Orthopédie' },
    { href: '/rehabilitation', imageUrl: '/images/rehabilitation.png', title: 'Réadaptation' },
  ];

  const bubbleWrapperStyle = {
    display: 'flex',
    justifyContent: 'flex-start',
    columnGap: theme.spacing(1),
    overflowX: 'scroll',
    padding: theme.spacing(0, 2, 2, 2),
    [theme.breakpoints.up('md')]: {
      justifyContent: 'center',
    },
  };

  const bubbleItemStyle = {
    maxWidth: '79px',
    minWidth: '79px',
    display: 'grid',
    rowGap: theme.spacing(0.75),
    textDecoration: 'none',
    color: theme.palette.text.primary,
    textAlign: 'center',
    '&:hover': {
      textDecoration: 'none',
    },
  };

  const bubbleImageContainerStyle = {
    maxWidth: '65px',
    minWidth: '65px',
    margin: '0 auto',
  };

  return (
    <Box
      id="shopify-section-1e76963c-135f-408b-a745-bb3e0a5d9893"
      className="shopify-section"
      sx={{
        display: isMobile ? 'block' : 'none',
      }}
    >
      <Box
        className="bubble-wrap  cf29-mobile-only"
        id="custom-block-page-1e76963c-135f-408b-a745-bb3e0a5d9893"
      >
        <Container maxWidth="lg">
          <Box className="cf29-bubble-container" sx={{ paddingBottom: theme.spacing(3.25) }}>
            <Box className="cf29-bubble-wrapper" sx={bubbleWrapperStyle}>
              {bubbleItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="cf29-bubble-item"
                  sx={bubbleItemStyle}
                >
                  <Box className="cf29-bubble-image-container" sx={bubbleImageContainerStyle}>
                    <Avatar
                      src={item.imageUrl}
                      alt={item.title}
                      sx={{
                        width: 65,
                        height: 65,
                        borderRadius: '0%',
                        margin: '0 auto',
                      }}
                      variant="square"
                    />
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      fontFamily: 'Poppins',
                      fontSize: '0.625rem',
                      fontWeight: 500,
                      lineHeight: 1.3,
                      letterSpacing: 'normal',
                      textAlign: 'center',
                      color: '#232323',
                      textTransform: 'uppercase',
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: '2',
                      WebkitBoxOrient: 'vertical',
                      minHeight: '2.6em',
                    }}
                  >
                    {item.title}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default BubbleMenu;