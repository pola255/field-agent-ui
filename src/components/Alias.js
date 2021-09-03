import { useState } from "react"

const Alias = ({ alias, deleteById, updateAlias }) => {
    const [editMode, setEditMode] = useState(false)
    const [editedAlias, setEditedAlias] = useState({ ...alias })

    const update = () => {
        updateAlias(editedAlias).then(() => { setEditMode(false) })

    }

    if (editMode) {
        return <tr key={alias.aliasId}>

            <td>

                <input type="text" value={editedAlias.name} onChange={(e) => {
                    setEditedAlias({ ...editedAlias, name: e.target.value })
                }} className="form-control" aria-describedby="inputGroup-sizing-sm" />

            </td>

            <td>
                <input type="text" value={editedAlias.persona} onChange={(e) => {
                    setEditedAlias({ ...editedAlias, persona: e.target.value })
                }} className="form-control" aria-describedby="inputGroup-sizing-sm" />

            </td>


            {<div className="btn-group" role="group" aria-label="Basic example">

                <button onClick={() => {
                    setEditMode(false)
                    setEditedAlias({ ...alias })
                }} className="btn btn-secondary">Cancel</button>
                <td><button onClick={() => update(editedAlias)} className="btn btn-primary">Update</button>
                </td>
            </div>}

        </tr>



    }

    return <tr key={alias.aliasId}>
        <td>{alias.name}</td>
        <td>{alias.persona}</td>
        {<td><div className="btn-group" role="group" aria-label="Basic example">
            <button onClick={() => deleteById(alias.aliasId)} className="btn btn-danger">Delete</button>
            <button onClick={() => setEditMode(true)} className="btn btn-primary">Edit</button></div></td>}

    </tr>
}

export default Alias;