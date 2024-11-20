import { Breadcrumbs, Stack, Link, Typography } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';

function Breadcrumb() {
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter((x) => x);
  const searchParams = new URLSearchParams(location.search);

  const collection = searchParams.get('collection');

  const breadcrumbs = [
    <Link href="/" key="1" style={{ textDecoration: 'none' }}>
      <Typography variant="nav" color="#666666" fontSize={20}>
        Home
      </Typography>
    </Link>,
    <Link href="/shop" key="2" style={{ textDecoration: 'none' }}>
      <Typography variant="nav" color="#666666" fontSize={20}>
        Shop
      </Typography>
    </Link>,
  ];

  if (pathnames[1]) {
    const category = pathnames[1];
    breadcrumbs.push(
      <Link
        href={`/shop/${category}`}
        key="3"
        style={{ textDecoration: 'none' }}
      >
        <Typography variant="nav" color="#666666" fontSize={20}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Typography>
      </Link>
    );
  }

  if (collection) {
    breadcrumbs.push(
      <Typography key="4">
        <Typography variant="nav" color="#666666" fontSize={20}>
          {collection.charAt(0).toUpperCase() + collection.slice(1)}
        </Typography>
      </Typography>
    );
  }

  return (
    <Stack spacing={2} mt={2} ml={2}>
      <Breadcrumbs
        separator={<NavigateNext fontSize="medium" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}

export default Breadcrumb;
