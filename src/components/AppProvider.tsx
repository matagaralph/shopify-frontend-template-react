import {
    AppProvider as PolarisAppProvider,
    AppProviderProps as PolarisAppProviderProps,
  } from '@shopify/polaris';
  // This leads to some TS errors, but it does compile to something that works
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import englishI18n from '@shopify/polaris/locales/en.json' with {type: 'json'};
import { ReactNode, useCallback } from 'react';

  export interface AppProviderProps
  extends Omit<PolarisAppProviderProps, 'linkComponent' | 'i18n'>  {
      /**
   * The internationalization (i18n) configuration for your Polaris provider.
   *
   * {@link https://polaris.shopify.com/components/utilities/app-provider}
   */
  i18n?: PolarisAppProviderProps['i18n'];
  }

  function AppBridgeLink({
    url,
    children,
    ...rest
  }: {
    url: string;
    children?: ReactNode;
  }) {
    const handleClick = useCallback(() => window.open(url), [url]);
  
    return (
      <a {...rest} onClick={handleClick}>
        {children}
      </a>
    );
  }

  export function AppProvider(props: AppProviderProps) {
    const {
        children,
        i18n,
        ...rest
      } = props;

      return  <PolarisAppProvider
      {...rest}
      linkComponent={AppBridgeLink}
      i18n={i18n || englishI18n}
    >
      {children}
    </PolarisAppProvider>
  
    
  }