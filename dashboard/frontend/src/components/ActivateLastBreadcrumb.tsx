import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link, { LinkProps } from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import {
  Link as RouterLink,
  useLocation
} from 'react-router-dom';

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

const breadcrumbNameMap: { [key: string]: string } = {
    '/Totale%20Lisenser': 'Totale Lisenser',
    '/Ubrukte%20Lisenser': 'Ubrukte Lisenser',
    '/Ledige%20Lisenser': 'Ledige Lisenser',
    '/lisensportal': 'Lisensportalen',
    '/FAQ': 'Ofte stilte spørsmål',
    '/minside': 'Min side'
  };


function LinkRouter(props: LinkRouterProps) {
  return <Link {...props} component={RouterLink as any} />;
}


export default function ActiveLastBreadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <LinkRouter underline="hover" color="inherit" to="/">
        Dashboard
      </LinkRouter>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return last ? (
          <Typography color="text.primary" key={to}>
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <LinkRouter underline="hover" color="inherit" to={to} key={to}>
            {breadcrumbNameMap[to]}
          </LinkRouter>
        );
      })}
    </Breadcrumbs>
  );
}