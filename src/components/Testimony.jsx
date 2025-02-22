import React from 'react';
import {
  Box,
  Container,
  Typography,
  Avatar,
  useTheme,
  useMediaQuery,
  Grid2
} from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const Testimonial = ({ testimonial, author, jobTitle, avatarUrl }) => {
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.spacing(1),  // Soft rounded corners
        padding: theme.spacing(3), // Increased padding
        textAlign: 'center',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow
        height: '100%', // Take up full height of grid item
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <FormatQuoteIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 1 }} />
      <Typography
        variant="body1"
        sx={{
          fontStyle: 'italic',
          mb: 2,
          color: theme.palette.text.secondary,
          lineHeight: 1.6, // Improved readability
        }}
      >
        {testimonial}
      </Typography>
      <Avatar
        alt={author}
        src={avatarUrl}
        sx={{ width: 70, height: 70, mb: 1 }}
      />
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 'bold',
          color: theme.palette.text.primary,
          mb: 0.5,
        }}
      >
        {author}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {jobTitle}
      </Typography>
    </Box>
  );
};

const Testimony = ({ testimonials }) => {
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      id="shopify-section-testimonials"
      className="shopify-section testimonials-section"
      sx={{
        backgroundColor: '#f9f9f9', // Light grey background
        padding: theme.spacing(5, 0),
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 600, // Semi-bold title
            color: theme.palette.text.primary,
            mb: 4,
          }}
        >
          What Our Customers Say
        </Typography>
        <Grid2 container spacing={3} justifyContent="center">
          {testimonials.map((testimonial, index) => (
            <Grid2 item xs={12} md={6} lg={4} key={index}>
              <Testimonial
                testimonial={testimonial.text}
                author={testimonial.author}
                jobTitle={testimonial.jobTitle}
                avatarUrl={testimonial.avatarUrl}
              />
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>
  );
};

export default Testimony;