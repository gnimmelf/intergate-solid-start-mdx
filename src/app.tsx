import { Suspense } from "solid-js";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { MetaProvider } from "@solidjs/meta";
import { PageDataProvider } from "./components/PageDataContext";
import { PageHeader } from "./components/PageHeader";
import { Article } from "./components/Article";
import { ThemeProvider} from "./components/ThemeProvider";
import "./app.css";

export default function App() {
  return (
    <Router
      root={(props) => (
        <PageDataProvider>
          <MetaProvider>
            <Suspense>
              <ThemeProvider>
                <PageHeader />
                <Article>{props.children}</Article>
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
