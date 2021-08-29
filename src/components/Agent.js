import { useState } from "react"

const Agent = ({ agent, deleteById, updateAgent }) => {
    const [editMode, setEditMode] = useState(false)
    const [editedAgent, setEditedAgent] = useState({...agent})

    const update = () => {
        updateAgent(editedAgent).then(() => {setEditMode(false)})
        
    }

    if (editMode) {
        return <tr key={agent.agentId}>
            <td><input type="text" value={editedAgent.firstName} onChange={(e) => {
                        setEditedAgent({ ...editedAgent, firstName: e.target.value })
                    }} /></td>
            <td><input type="text" value={editedAgent.lastName} onChange={(e) => {
                        setEditedAgent({ ...editedAgent, lastName: e.target.value })
                    }}/></td>
            <td><input type="text" value={editedAgent.heightInInches} onChange={(e) => {
                        setEditedAgent({ ...editedAgent, heightInInches: e.target.value })
                    }}/></td>
            {<td><button onClick={() => update(editedAgent)}>Update</button></td>}
        </tr>

    }

    return <tr key={agent.agentId}>
        <td>{agent.firstName}</td>
        <td>{agent.lastName}</td>
        <td>{agent.heightInInches}</td>
        {<td><button onClick={() => deleteById(agent.agentId)}>Delete</button></td>}
        {<td><button onClick={() => setEditMode(true)}>Edit</button></td>}
    </tr>
}

export default Agent