import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import Wrapper from '@/layouts/Wrapper';
import AppProvider from '@/reducer/Provider';

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </AppProvider>
  );
}

export default MyApp;
