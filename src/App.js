import AgentFetch from './components/AgentFetch';
import AgencyFetch from "./components/AgencyFetch";
import AgentDetail from './components/AgentDetail';
//import NavBar from "./components/Nav";
import NotFound from "./components/NotFound";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
      <main>
          <Switch>
              <Route path="/" component={AgentFetch} exact />
              <Route path="/agent/:agentId" component={AgentDetail} />
              <Route component={NotFound} />
          </Switch>
      </main>
  )
}


/* function App() {
  return (
    
    <Router>
      
      <Switch>
        <Route path="/agent">
          <AgentFetch />
        </Route>
        <Route path={["/agent/:id"]}>
          <AgentDetail />
        </Route>
        <Route path="/agency">
          <AgencyFetch />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}
 */
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <AgentFetch />
        </p>
      </header>
    </div>
  );
}
*/
export default App;







