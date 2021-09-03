import { useState } from 'react';
import { useHistory } from "react-router-dom";

function AddAgentForm() {
    const [inputState, setInputState] = useState({ firstName: "", lastName: "", heightInInches: "" })
    let history = useHistory();
    // Add an agent
    const addAgent = () => {

        const init = {
            method: "POST",
            headers: {
                "content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(inputState)
        };
        return fetch("http://localhost:8080/api/agent", init)
            .then(response => {
                if (response.status !== 201) {
                    return Promise.reject("response is not 200 Ok");
                }

                history.goBack();
            })
        

            .catch(console.log);
    }



    const setInput = (event) => {
        addAgent(inputState).then(() => {
            setInputState({ firstName: "", lastName: "", heightInInches: "" });
        });
        event.preventDefault()
    }

    return <form onSubmit={(event) => setInput(event)} className="row g-3 needs-validation" novalidate>

        <div className="container">
            <div className="row justify-content-center">
                <div className="col-4">
                    <h2>Add Agent</h2>
                    <div className="col-6">

                        <label for="exampleFormControlInput1" class="form-label">First Name :</label>
                        <input type="text" value={inputState.firstName}
                            onChange={(e) => {
                                setInputState({ ...inputState, firstName: e.target.value })
                            }} className="form-control" placeholder="FirstName" aria-label="FirstName" aria-describedby="inputGroup-sizing-sm" required />

                    </div>

                    <div className="col-6">
                        <label for="exampleFormControlInput1" class="form-label">Last Name :</label>
                        <input type="text" value={inputState.lastName}
                            onChange={(e) => {
                                setInputState({ ...inputState, lastName: e.target.value })
                            }} className="form-control" placeholder="LastName" aria-label="LastName" aria-describedby="inputGroup-sizing-sm" required />
                    </div>

                    <div className="col-6">
                        <label for="exampleFormControlInput1" class="form-label">Height (inches) :</label>
                        <input type="number" value={inputState.heightInInches}
                            onChange={(e) => {
                                setInputState({ ...inputState, heightInInches: e.target.value })
                            }} className="form-control" placeholder="Height (inches)" aria-label="Height (inches)" aria-describedby="inputGroup-sizing-sm" required min="36" max="96" />
                    </div>
                    <div className="btn-group" role="group" aria-label="Basic example">

                        <button onClick={history.goBack} className="btn btn-secondary">Cancel</button>
                        <button type="submit" className="btn btn-primary"> Add Agent</button>
                    </div>
                </div>
            </div>
        </div>

    </form>


}


export default AddAgentForm;