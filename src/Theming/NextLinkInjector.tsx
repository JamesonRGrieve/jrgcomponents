import React, { forwardRef } from 'react';
import NextLink from 'next/link';

const NextLinkInjector = forwardRef(function LinkBehaviour(props, ref) {
  // @ts-expect-error https://stackoverflow.com/questions/66226576/using-the-material-ui-link-component-with-the-next-js-link-component
  return <NextLink ref={ref} {...props} />;
});
export default NextLinkInjector;
