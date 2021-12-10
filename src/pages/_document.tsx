import { Fragment } from 'react';
import NextDocument from 'next/document';
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components';
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@mui/styles';

/* eslint-disable @typescript-eslint/no-explicit-any */
// Code from https://javascript.plainenglish.io/ssr-with-next-js-styled-components-and-material-ui-b1e88ac11dfa
export default class Document extends NextDocument {
  static async getInitialProps(ctx: any) {
    const styledComponentSheet = new StyledComponentSheets();
    const materialUiSheets = new MaterialUiServerStyleSheets();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) =>
            styledComponentSheet.collectStyles(
              materialUiSheets.collect(<App {...props} />),
            ),
        });
      const initialProps = await NextDocument.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [
          <Fragment key="styles">
            {initialProps.styles}
            {materialUiSheets.getStyleElement()}
            {styledComponentSheet.getStyleElement()}
          </Fragment>,
        ],
      };
    } finally {
      styledComponentSheet.seal();
    }
  }
}
