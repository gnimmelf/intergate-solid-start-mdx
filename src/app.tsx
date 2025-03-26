import { createEffect, createMemo, Show, Suspense } from "solid-js";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";
import { PageDataProvider, usePageData } from "./components/PageDataContext";
import "./app.css";

function Header() {
  const pageData = usePageData();

  return (
    <>
      <nav>
        <a href="/">Index</a>
        <a href="/about">About</a>
      </nav>
      <div>Title: {pageData()?.frontmatter.title}</div>
      <pre>{JSON.stringify({data: pageData()}, null, 2)}</pre>
    </>
  );
}

export default function App() {
  return (
    <Router
      root={(props) => (
        <PageDataProvider>
          <MetaProvider>
            <Suspense>
              <main>
                <header>
                  <Header />
                </header>
                <article>{props.children}</article>
              </main>
            </Suspense>
          </MetaProvider>
        </PageDataProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
