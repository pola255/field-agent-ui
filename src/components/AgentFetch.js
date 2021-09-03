import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Agent from "./Agent";


function AgentFetch() {
    const [agents, setAgents] = useState([]);


    useEffect(() => {
        fetch("http://localhost:8080/api/agent")
            .then(response => {
                if (response.status !== 200) {
                    return Promise.reject("Agent fetch failed");
                }
                return response.json();
            })
            .then(json => setAgents(json))
            .catch(console.log);
    }, []);

  
    // Delete by Id

    const deleteById = (id) => {
        return fetch(`http://localhost:8080/api/agent/${id}`, { method: "DELETE" })
            .then(response => {
                if (response.status === 204) {
                    setAgents(agents.filter(a => a.agentId !== id));

                } else if (response.status === 404) {
                    return Promise.reject("Agent not found")
                } else {
                    return Promise.reject(`Delete failed with status: ${response.status}`);
                }
            })
            .catch(console.log);
    }

    // Update

    const update = (agent) => {
        const init = {
            method: "PUT",
            headers: {
                "content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(agent)
        };

        return fetch(`http://localhost:8080/api/agent/${agent.agentId}`, init)
            .then(response => {
                if (response.status === 404) {
                    return Promise.reject("Agent not found")
                } else if (response.status === 204) {
                    setAgents(agents.map(a => (a.agentId === agent.agentId ? agent : a)))
                } else {
                    return Promise.reject(`Update failed with status: ${response.status}`);
                }

            })
            .catch(console.log);
    }

    return (

        <div className="container-sm">

            <h1>Field Agent</h1>

            <Link to={`/agent/add`} className="btn btn-success">
                Add Agent
            </Link>
          

            <table className="table table-striped">
                <thead>
                    <tr>

                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Height</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {agents.map(a => <Agent agent={a} deleteById={deleteById} updateAgent={update} />)}

                </tbody>
            </table>
        </div>

    );

}

export default AgentFetch;