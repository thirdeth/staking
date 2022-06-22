import { FC, ReactNode, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { useSmoothTopScroll, useWindowState } from 'hooks';
import { useBreadcrumbs } from 'modules/layout/hooks';
import { BG_MAIN, HOME_IMAGE_BG, HOME_IMAGE_BG_MOBILE } from 'theme/variables';

import { Breadcrumbs, Footer, Header, NotificationModal } from '..';

export interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const [breadcrumbs] = useBreadcrumbs();
  const { pathname } = useLocation();
  const { width } = useWindowState();

  const HOIME_BG = +width > 900 ? HOME_IMAGE_BG : HOME_IMAGE_BG_MOBILE;

  const firstPathAtPathname = useMemo(() => pathname.split('/')[1], [pathname]);
  const isHomePage = pathname === '/';
  useSmoothTopScroll(firstPathAtPathname);

  return (
    <Box
      sx={{
        height: '100%',
        background: isHomePage ? HOIME_BG : BG_MAIN,
      }}
    >
      <Header />
      <NotificationModal />
      <Container
        sx={{
          pt: isHomePage ? 15 : 5,
          px: { xs: 3, sm: 3, md: 0, lg: 0 },
        }}
      >
        {!isHomePage && <Breadcrumbs routesBreadcrumbs={breadcrumbs} />}
        {children}
      </Container>
      <Footer />
    </Box>
  );
};
