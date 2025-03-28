import { Suspense } from "solid-js";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { MetaProvider } from "@solidjs/meta";
import { PageDataProvider } from "./components/PageDataContext";
import { Header } from "./components/Header";
import { Article } from "./components/Article";
import "./assets/global.css";
import "./app.css";

export default function App() {
  return (
    <Router
      root={(props) => (
        <PageDataProvider>
          <MetaProvider>
            <Suspense>
              <main>
                <Header />
                <Article>{props.children}</Article>
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
