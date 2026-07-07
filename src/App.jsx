/**
 * App
 * -----------------------------------------------------------------------
 * Thin root shell. All actual page content lives in pages/, all routing
 * logic lives in routes/AppRoutes — this file's only job is the
 * page-load fade transition wrapper, which should apply regardless of
 * which route is active.
 * ----------------------------------------------------------------------- */

import { PageTransition } from "./components/animations/PageTransition";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <PageTransition>
      <AppRoutes />
    </PageTransition>
  );
}

export default App;