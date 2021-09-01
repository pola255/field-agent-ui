import { useState } from "react"
import { Link } from "react-router-dom"
//import { useHistory } from 'react-router-dom'

const Agent = ({ agent, deleteById, updateAgent }) => {
    const [editMode, setEditMode] = useState(false)
    const [editedAgent, setEditedAgent] = useState({ ...agent })

    const update = () => {
        updateAgent(editedAgent).then(() => { setEditMode(false) })

    }

    if (editMode) {
        return <tr key={agent.agentId}>

            <td>

                <input type="text" value={editedAgent.firstName} onChange={(e) => {
                    setEditedAgent({ ...editedAgent, firstName: e.target.value })
                }} className="form-control" aria-describedby="inputGroup-sizing-sm" /></td>
            <td><input type="text" value={editedAgent.lastName} onChange={(e) => {
                setEditedAgent({ ...editedAgent, lastName: e.target.value })
            }} className="form-control" aria-describedby="inputGroup-sizing-sm" /></td>
            <td><input type="text" value={editedAgent.heightInInches} onChange={(e) => {
                setEditedAgent({ ...editedAgent, heightInInches: e.target.value })
            }} className="form-control" aria-describedby="inputGroup-sizing-sm" /></td>
            {<div className="btn-group" role="group" aria-label="Basic example">

                <button onClick={() => {
                    setEditMode(false)
                    setEditedAgent({ ...agent })
                }} className="btn btn-secondary">Cancel</button>
                <td><button onClick={() => update(editedAgent)} className="btn btn-primary">Update</button>
                </td> </div>}

        </tr>



    }

    return <tr key={agent.agentId}>
        <td>{agent.firstName}</td>
        <td>{agent.lastName}</td>
        <td>{agent.heightInInches}</td>
        {<td>
            <div className="btn-group" role="group" aria-label="Basic example">
                <button onClick={() => deleteById(agent.agentId)} className="btn btn-danger">Delete</button>
                <button onClick={() => setEditMode(true)} className="btn btn-primary">Edit</button>

                <Link to={`/agent/${agent.agentId }`} className="btn btn-info">
                 
                    Show
                </Link>
            </div></td>}

    </tr>
}

export default Agent