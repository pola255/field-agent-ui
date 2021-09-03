import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

function AddAgencyAgentForm() {
    const { agencyId } = useParams();
    const [inputState, setInputState] = useState({ agencyId: parseInt(agencyId), identifier: "", activationDate: "", securityClearance: { securityClearanceId: 0 }, agent: { agentId: 0 }, active: false });
    const [agents, setAgents] = useState([]);
    const [securityClearances, setsecurityClearances] = useState([]);
    let history = useHistory();
    const [errorMessage, setErrorMessage] = useState(null);
    // Fetch Agents to dropdown field

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

    // Fetch Security clearance to dropdown field

    useEffect(() => {
        fetch("http://localhost:8080/api/security-clearance")
            .then(response => {
                if (response.status !== 200) {
                    return Promise.reject("security clearances fetch failed");
                }
                return response.json();
            })
            .then(json => setsecurityClearances(json))
            .catch(console.log);
    }, []);

    // Add an agencyAgent relationship

    const addAgencyAgent = () => {

        const init = {
            method: "POST",
            headers: {
                "content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(inputState)
        };
        return fetch("http://localhost:8080/api/agency/agent", init)
            .then(response => {
                if (response.status !== 201) {
                    return response.json().then(errors => Promise.reject(errors[0]))
                }

                history.goBack();
            })

            .catch(setErrorMessage);
    }

    const setInput = (event) => {
        addAgencyAgent(inputState).then(() => {
            setInputState({ agencyId: parseInt(agencyId), identifier: "", activationDate: "", securityClearance: { securityClearanceId: 0 }, agent: { agentId: 0 }, active: false });
        });
        event.preventDefault()
    }

    return <div className="container-sm">
        <div className="row">
            <div className="col-6">
                <form onSubmit={(event) => setInput(event)} className="row g-3 needs-validation" novalidate>

                    <h2>Add agent</h2>
                    {errorMessage && <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>}
                    <div className="col-6">

                        <label for="exampleFormControlInput1" class="form-label">Agents :</label>
                        <select class="form-select form-select-sm" aria-label=".form-select-sm example" required onChange={(e) => {
                            setInputState({ ...inputState, agent: { agentId: e.target.value } })

                        }}>
                            <option selected>Select agent</option>
                            {agents.map(a =>
                                <option key={a.agentId} value={a.agentId}>{a.firstName} {a.lastName}</option>
                            )};
                        </select>

                    </div>

                    <div className="col-6">
                        <label for="exampleFormControlInput1" class="form-label">Identifier :</label>
                        <input type="text" value={inputState.identifier}
                            onChange={(e) => {
                                setInputState({ ...inputState, identifier: e.target.value })
                            }} className="form-control" placeholder="Identifier" aria-label="Identifier" aria-describedby="inputGroup-sizing-sm" required />
                    </div>

                    <div className="col-6">

                        <label for="exampleFormControlInput1" class="form-label">Security clearance :</label>
                        <select class="form-select form-select-sm" aria-label=".form-select-sm example" required onChange={(e) => {
                            setInputState({ ...inputState, securityClearance: { securityClearanceId: e.target.value } })
                        }}>
                            <option selected>Select security clearance</option>
                            {securityClearances.map(sc =>
                                <option key={sc.securityClearanceId} value={sc.securityClearanceId}>{sc.name}</option>
                            )};
                        </select>

                    </div>

                    <div className="col-6">
                        <label for="exampleFormControlInput1" class="form-label">Activation date:</label>
                        <input type="date" className="form-control" required onChange={(e) => {
                            setInputState({ ...inputState, activationDate: e.target.value })
                        }} />

                    </div>

                    <div class="form-check">

                        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" onChange={(e) => {
                            console.log(e.target.checked)
                            setInputState({ ...inputState, active: e.target.checked })
                        }} />
                        <label class="form-check-label" for="flexCheckChecked">
                            Active
                        </label>

                    </div>

                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button onClick={history.goBack} className="btn btn-secondary">Cancel</button>
                        <button type="submit" className="btn btn-primary"> Add Agent</button>
                    </div>

                </form>
            </div>
        </div>
    </div>

}

export default AddAgencyAgentForm;