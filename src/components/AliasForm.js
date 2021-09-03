import { useState } from "react";

function AddAliasForm({ addAlias, agentId }) {
    console.log(agentId)
    const [inputState, setInputState] = useState({ name: "", persona: "", agentId: agentId})
    const setInput = (event) => {
        addAlias(inputState).then(() => {
            setInputState({ name: "", persona: "" , agentId:agentId});
        });
        event.preventDefault();
    }

    return (
        <form onSubmit={(event) => setInput(event)}>
            <div className="col-6">
                <label for="exampleFormControlInput1" class="form-label">Alias:</label>
                <input type="text" value={inputState.name}
                    onChange={(e) => {
                        setInputState({ ...inputState, name: e.target.value })
                    }} className="form-control" placeholder="name" aria-label="Name" aria-describedby="inputGroup-sizing-sm" required />

            </div>

            <div className="col-6">
                <label for="exampleFormControlInput1" class="form-label">Persona:</label>
                <input type="text" value={inputState.persona}
                    onChange={(e) => {
                        setInputState({ ...inputState, persona: e.target.value })
                    }} className="form-control" placeholder="persona" aria-label="persona" aria-describedby="inputGroup-sizing-sm" />
            </div>

            <td><div>
               
                <button type="submit" className="btn btn-primary"> Add Alias</button>
            </div></td>

        </form>
    );
}

export default AddAliasForm;
