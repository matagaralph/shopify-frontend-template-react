import { NavMenu } from '@shopify/app-bridge-react';
import { BrowserRouter } from 'react-router';
import { AppProvider } from './components/AppProvider';
import { QueryProvider } from './components/QueryProvider';
import Routes from './Routes';

/**
 * Sets up the AppProvider from Polaris.
 * @desc PolarisProvider passes a custom link component to Polaris.
 * The Link component handles navigation within an embedded app.
 * Prefer using this vs any other method such as an anchor.
 * Use it by importing Link from Polaris, e.g:
 *
 * ```
 * import {Link} from '@shopify/polaris'
 *
 * function MyComponent() {
 *  return (
 *    <div><Link url="/tab2">Tab 2</Link></div>
 *  )
 * }
 * ```
 *
 * PolarisProvider also passes translations to Polaris.
 *
 */
function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info

  const pages = import.meta.glob('./pages/**/!(*.test.[jt]sx)*.([jt]sx)', {
    eager: true,
  });

  return (
    <AppProvider>
      <BrowserRouter>
        <QueryProvider>
          <NavMenu>
            <a href='/' rel='home' />
          </NavMenu>
          <Routes pages={pages} />
        </QueryProvider>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
