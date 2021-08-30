import { useState } from 'react';


function AddAgentForm({ addAgent }) {
    const [inputState, setInputState] = useState({ firstName: "", lastName: "", heightInInches: "" })
    const setInput = (event) => {
        addAgent(inputState).then(() => {
            setInputState({ firstName: "", lastName: "", heightInInches: "" });
        });
        event.preventDefault()
    }
    return <form onSubmit={(event) => setInput(event)} className="row g-3 needs-validation" novalidate>
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="http://localhost:3000/">Agent</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="http://localhost:3000/">Alias</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="http://localhost:3000/">Agency</a>
            </li>

        </ul>

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
        <div>
            <button onClick={() => {
                setInputState({ firstName: "", lastName: "", heightInInches: "" })
            }} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary"> Add Agent</button>
        </div>
    </form>


}


export default AddAgentForm;