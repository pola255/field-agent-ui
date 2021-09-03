import AgentFetch from './components/AgentFetch';
import AgencyFetch from "./components/AgencyFetch";
import AgentDetail from './components/AgentDetail';
import NotFound from "./components/NotFound";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddAgentForm from './components/AgentForm'
import NavBar from './components/Nav';
import AddAgencyForm from './components/AgencyForm';
import AgencyDetail from './components/AgencyDetail';
import AddAgencyAgentForm from './components/AgencyAgentForm';

function App() {
  return (
      <main>
        {<NavBar></NavBar> }
          <Switch>
              <Route path="/" component={AgentFetch} exact />
              <Route path="/agent/add" component={AddAgentForm} />
              <Route path="/agent/:agentId" component={AgentDetail} />
              <Route path="/agency/add" component={AddAgencyForm} />
              <Route path="/agency-agent/add/:agencyId" component={AddAgencyAgentForm} /> 
              <Route path="/agency/:agencyId" component={AgencyDetail} />
              <Route path="/agency" component={AgencyFetch}/>
              <Route component={NotFound} />
          </Switch>
      </main>
  )
}

export default App;







