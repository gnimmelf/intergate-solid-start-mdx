import { Suspense } from "solid-js";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { MetaProvider } from "@solidjs/meta";
import { PageDataProvider } from "./components/PageDataContext";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { Article } from "./components/Article";
import { ThemeProvider} from "./components/ThemeProvider";

import "./app.css";
import { MdxComponentProvider } from "./components/MdxComponentProvider";

export default function App() {
  return (
    <Router
      root={(props) => (
        <PageDataProvider>
          <MetaProvider>
            <Suspense>
              <ThemeProvider>
                <SiteHeader />
                <MdxComponentProvider>
                  <Article>{props.children}</Article>
                </MdxComponentProvider>
                <SiteFooter />
              </ThemeProvider>
            </Suspense>
          </MetaProvider>
        </PageDataProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
