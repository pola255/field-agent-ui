import { useState } from 'react';
import { useHistory } from "react-router-dom";

function AddAgencyForm() {
    const [inputState, setInputState] = useState({ shortName: "", longName: "" })
    let history = useHistory();

    // Add an agency
    const addAgency = () => {

        const init = {
            method: "POST",
            headers: {
                "content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(inputState)
        };
        return fetch("http://localhost:8080/api/agency", init)
            .then(response => {
                if (response.status !== 201) {
                    return Promise.reject("response is not 200 Ok");
                }

                return response.json();
            })

            .catch(console.log);
    }

    const setInput = (event) => {
        addAgency(inputState).then(() => {
            setInputState({ shortName: "", longName: "" });
        });
        event.preventDefault()
    }

    return <div className="container">
        <div className="row justify-content-center">
        <div className="col-4">
            <form onSubmit={(event) => setInput(event)} className="row g-3 needs-validation" novalidate>

                <h2>Add agency</h2>    
                <div className="col-6">

                    <label for="exampleFormControlInput1" class="form-label">Short Name :</label>
                    <input type="text" value={inputState.shortName}
                        onChange={(e) => {
                            setInputState({ ...inputState, shortName: e.target.value })
                        }} className="form-control" placeholder="ShortName" aria-label="ShortName" aria-describedby="inputGroup-sizing-sm" required />

                </div>

                <div className="col-6">
                    <label for="exampleFormControlInput1" class="form-label">Long Name :</label>
                    <input type="text" value={inputState.longName}
                        onChange={(e) => {
                            setInputState({ ...inputState, longName: e.target.value })
                        }} className="form-control" placeholder="LongName" aria-label="LongName" aria-describedby="inputGroup-sizing-sm" required />
                </div>


                <div className="btn-group" role="group" aria-label="Basic example">

                    <button onClick={history.goBack} className="btn btn-secondary">Cancel</button>
                    <button type="submit" className="btn btn-primary"> Add Agency</button>
                </div>
            </form>
        </div>
    </div>
    </div>

}

export default AddAgencyForm;