import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import '../styles/main.css';
import store from '../redux/store';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
);

export default MyApp;
