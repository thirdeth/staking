import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Layout } from 'modules/layout/containers';
import { RouteManager } from 'modules/router/containers';
import { PersistGate } from 'redux-persist/integration/react';
import { WalletConnectContext } from 'services';
import store from 'store/configureStore';
import { theme } from 'theme';

import 'react-toastify/dist/ReactToastify.css';
import './styles/index.scss';

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <Provider store={store.store}>
    <PersistGate loading={null} persistor={store.persistor}>
      <Router>
        <Suspense fallback={<div>Loading ...</div>}>
          <WalletConnectContext>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <ToastContainer autoClose={4000} hideProgressBar position="bottom-right" closeButton />
              <Layout>
                <RouteManager />
              </Layout>
            </ThemeProvider>
          </WalletConnectContext>
        </Suspense>
      </Router>
    </PersistGate>
  </Provider>,
);
