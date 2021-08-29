import { useState } from 'react';


function AddAgentForm({addAgent}) {
    const [inputState, setInputState] = useState({ firstName: "", lastName: "", heightInInches: "" })
    const setInput = (event) =>{
        addAgent(inputState).then(() => {
            setInputState({ firstName: "", lastName: "", heightInInches: "" });
        });
        event.preventDefault()
    }
    return <form onSubmit={(event) => setInput (event) }>
        <div>
            <h2>Add an Agent</h2>
            First Name : <input type="text" value={inputState.firstName}
                onChange={(e) => {
                    setInputState({ ...inputState, firstName: e.target.value })
                }} required/>
        </div>
        <div>Last Name : <input type="text" value={inputState.lastName}
            onChange={(e) => {
                setInputState({ ...inputState, lastName: e.target.value })
            }} required/>
        </div>
        <div>Height (inches) : <input type="number" value={inputState.heightInInches}
            onChange={(e) => {
                setInputState({ ...inputState, heightInInches: e.target.value })
            }} required min="36" max="96"/>
        </div>
        <div>
            <button type="submit"> Add Agent</button>
        </div>
    </form>

    
}


export default AddAgentForm;