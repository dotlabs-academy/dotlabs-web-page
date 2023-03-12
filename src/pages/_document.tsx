import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="w-full mx-auto bg-purple-dotlabs bg-gradient-to-tr from-amber-50 to-blue-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
