import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import AddAliasForm from "./AliasForm";
import Alias from "./Alias"


function AgentDetail() {

    const [agentDetails, setAgentDetails] = useState({});
    const { agentId } = useParams();
    const [alias, setAlias] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    let history = useHistory();

    useEffect(() => {
        fetch(`http://localhost:8080/api/agent/${agentId}`)
            .then(response => {
                if (response.status !== 200) {
                    return Promise.reject("Agent fetch failed");
                }
                return response.json();
            })
            .then(json => {
                setAgentDetails(json)
                setAlias(json.alias)
            })
            .catch(console.log);
    }, []);


    // Add Alias
    const addAlias = (inputState) => {

        const init = {
            method: "POST",
            headers: {
                "content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(inputState)
        };
        return fetch("http://localhost:8080/api/alias", init)
            .then(response => {
                if (response.status !== 201) {
                    return response.json().then(errors => Promise.reject(errors[0]))
                }
                return response.json()
            })
            .then(json => setAlias([...alias, json]))
            .catch(setErrorMessage)
    }

    // Delete by Id

    const deleteById = (id) => {
        return fetch(`http://localhost:8080/api/alias/${id}`, { method: "DELETE" })
            .then(response => {
                if (response.status === 204) {
                    setAlias(alias.filter(a => a.aliasId !== id));

                } else if (response.status === 404) {
                    return Promise.reject("Alias not found")
                } else {
                    return Promise.reject(`Delete failed with status: ${response.status}`);
                }
            })
            .catch(console.log);
    }

    // Update

    const update = (alias) => {
        const init = {
            method: "PUT",
            headers: {
                "content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(alias)
        };
        return fetch(`http://localhost:8080/api/alias/${alias.aliasId}`, init)
            .then(response => {
                if (response.status === 404) {
                    return Promise.reject("Alias not found")
                } else if (response.status === 204) {
                    setAlias(alias.map(a => (a.aliasId === alias.aliasId ? alias : a)))
                } else {
                    return Promise.reject(`Update failed with status: ${response.status}`);
                }

            })
            .catch(console.log);
    }

    return (
        <div className="container-sm">

            <h1>Agent details</h1>
            <table className="table table-striped">
                <thead>
                    <tr>

                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Height</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{agentDetails.firstName}</td>
                        <td>{agentDetails.lastName}</td>
                        <td>{agentDetails.heightInInches}</td>
                    </tr>

                </tbody>
            </table>
            <h2>Alias</h2>
            <table className="table table-striped">
                <thead>
                    <tr>

                        <th scope="col">Alias</th>
                        <th scope="col">Persona</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {alias.map(a => <Alias alias={a} deleteById={deleteById} updateAlias={update} />)}

                </tbody>
            </table>
            <h2>Add Alias</h2>

            {errorMessage && <div className="alert alert-danger" role="alert">
                {errorMessage}
            </div>}

            <AddAliasForm addAlias={addAlias} agentId={agentId} />
            <td><button onClick={history.goBack} className="btn btn-secondary">Back</button></td>
        </div>

        
    );
}



export default AgentDetail;

