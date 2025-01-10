import React, { lazy, Suspense, ComponentType } from "react";

/**
 * Options for the lazy loading component
 */
interface LazyLoadOptions {
  /** React node to show while the component is loading */
  fallback?: React.ReactNode;
  /** Optional error boundary fallback component */
  errorBoundary?: React.ComponentType<{ error: Error }>;
}

/**
 * Helper type to extract the resolved type from a Promise
 */
type UnwrapPromise<T> = T extends Promise<infer P> ? P : never;

/**
 * Creates a lazily loaded React component with proper TypeScript types
 *
 * @param importFunc - Dynamic import function that returns a Promise
 * @param selectorFunc - Optional selector function to pick specific component from the module
 * @param options - Configuration options for loading and error states
 * @returns A wrapped React component that handles lazy loading
 *
 * @example
 * ```tsx
 * // Basic usage
 * const MyLazyComponent = lazyLoad(() => import('./MyComponent'));
 *
 * // With component selector
 * const SpecificComponent = lazyLoad(
 *   () => import('./components'),
 *   (module) => module.SpecificComponent
 * );
 *
 * // With custom loading state
 * const ComponentWithLoader = lazyLoad(
 *   () => import('./MyComponent'),
 *   undefined,
 *   { fallback: <LoadingSpinner /> }
 * );
 * ```
 */
export function lazyLoad<
  TModule extends Promise<any>,
  TComponent extends ComponentType<any>
>(
  importFunc: () => TModule,
  selectorFunc?: (module: UnwrapPromise<TModule>) => TComponent,
  options: LazyLoadOptions = {}
): (props: React.ComponentProps<TComponent>) => JSX.Element {
  // Create the lazy factory function
  const lazyFactory = selectorFunc
    ? () => importFunc().then((module) => ({ default: selectorFunc(module) }))
    : (importFunc as () => Promise<{ default: TComponent }>);

  // Create the lazy component
  const LazyComponent = lazy(lazyFactory);

  // Create the wrapper component
  const WrappedComponent = (
    props: React.ComponentProps<TComponent>
  ): JSX.Element => {
    // Wrap in error boundary if provided
    const content = (
      <Suspense fallback={options.fallback ?? null}>
        <LazyComponent {...props} />
      </Suspense>
    );

    if (options.errorBoundary) {
      const ErrorBoundary = options.errorBoundary;
      return (
        <ErrorBoundaryWrapper ErrorComponent={ErrorBoundary}>
          {content}
        </ErrorBoundaryWrapper>
      );
    }

    return content;
  };

  // Add display name for better debugging
  WrappedComponent.displayName = `LazyLoaded(${
    selectorFunc ? "SelectedComponent" : "ImportedComponent"
  })`;

  return WrappedComponent;
}

/**
 * Error boundary wrapper component
 */
class ErrorBoundaryWrapper extends React.Component<{
  children: React.ReactNode;
  ErrorComponent: React.ComponentType<{ error: Error }>;
}> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return <this.props.ErrorComponent error={this.state.error} />;
    }
    return this.props.children;
  }
}
