import { Box, Grid, Stack, styled, Typography } from '@mui/material';

import data from '~/data/homeData';
const { blogs } = data;

const BlogContainer = styled(Stack)(({ theme }) => ({
  width: '100%',
  padding: '0px 55px',
  paddingBottom: '20px',
  backgroundColor: '#f5f5f5',
}));

const BlogItem = styled(Stack)(({ theme }) => ({
  padding: '20px',
  backgroundColor: '#fff',
  borderRadius: '10px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
}));

function Blog() {
  return (
    <BlogContainer>
      <Typography
        variant="h2"
        mb={2}
        sx={{
          color: '#db9662',
          letterSpacing: '1px',
        }}
      >
        OUR LATEST NEWS
      </Typography>
      <Grid container spacing={2}>
        {blogs.map((blog, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <BlogItem spacing={1}>
              <Box
                component="img"
                src={blog.img}
                alt={blog.title}
                sx={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                }}
              />
              <Typography
                variant="nav"
                fontWeight="bold"
                sx={{
                  textDecoration: 'none',
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                {blog.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {blog.date}
              </Typography>
              <Typography variant="text" color="textSecondary">
                {blog.content}
              </Typography>
            </BlogItem>
          </Grid>
        ))}
      </Grid>
    </BlogContainer>
  );
}

export default Blog;
