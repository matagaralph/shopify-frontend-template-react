import { Routes as ReactRouterRoutes, Route } from 'react-router';

/**
 * File-based routing.
 * @desc File-based routing that uses React Router under the hood.
 * To create a new route create a new .tsx file in `/pages` with a default export.
 *
 * Some examples:
 * * `/pages/index.tsx` matches `/`
 * * `/pages/blog/[id].tsx` matches `/blog/123`
 * * `/pages/[...catchAll].tsx` matches any URL not explicitly matched
 *
 * @param pages - An object mapping file paths to module exports, typically from `import.meta.glob`.
 *
 * @return {ReactNode} `<Routes/>` from React Router, with a `<Route/>` for each file in `pages`.
 */
export default function Routes({ pages }: { pages: Record<string, unknown> }) {
  const routes = useRoutes(pages);

  const routeComponents = routes.map(({ path, component: Component }) => (
    <Route key={path} path={path} element={<Component />} />
  ));

  const notFoundRoute = routes.find(({ path }) => path === '/notFound');
  const NotFound = notFoundRoute?.component;

  if (!NotFound) {
    console.warn('No `/notFound` route was found. Ensure one is defined.');
  }

  return (
    <ReactRouterRoutes>
      {routeComponents}
      <Route path='*' element={NotFound ? <NotFound /> : null} />
    </ReactRouterRoutes>
  );
}

/**
 * Generate routes from the `pages` object.
 *
 * @param pages - An object mapping file paths to modules, typically from `import.meta.glob`.
 * @returns An array of routes with `path` and `component` properties.
 */
function useRoutes(
  pages: Record<string, unknown>
): { path: string; component: React.ComponentType }[] {
  const routes = Object.keys(pages)
    .map((key) => {
      let path = key
        .replace('./pages', '')
        .replace(/\.(t|j)sx?$/, '')
        /**
         * Replace /index with /
         */
        .replace(/\/index$/i, '/')
        /**
         * Only lowercase the first letter. This allows the developer to use camelCase
         * dynamic paths while ensuring their standard routes are normalized to lowercase.
         */
        .replace(/\b[A-Z]/, (firstLetter) => firstLetter.toLowerCase())
        /**
         * Convert /[handle].tsx and /[...handle].tsx to /:handle for react-router
         */
        .replace(/\[(?:[.]{3})?(\w+?)\]/g, (_match, param) => `:${param}`);

      if (path.endsWith('/') && path !== '/') {
        path = path.substring(0, path.length - 1);
      }

      const pageModule = pages[key] as { default?: unknown };

      if (!pageModule?.default || typeof pageModule.default !== 'function') {
        console.warn(`${key} doesn't export a valid default React component`);
        return null;
      }

      return {
        path,
        component: pageModule.default as React.ComponentType,
      };
    })
    .filter(
      (route): route is { path: string; component: React.ComponentType } =>
        route !== null
    );

  return routes;
}
