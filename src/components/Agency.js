import { useState } from "react"
import { Link } from "react-router-dom"

const Agency = ({ agency, deleteById, updateAgency }) => {
    const [editMode, setEditMode] = useState(false)
    const [editedAgency, setEditedAgency] = useState({ ...agency })

    const update = () => {
        updateAgency(editedAgency).then(() => { setEditMode(false) })

    }

    if (editMode) {
        return <tr key={agency.agencyId}>

            <td>

                <input type="text" value={editedAgency.shortName} onChange={(e) => {
                    setEditedAgency({ ...editedAgency, shortName: e.target.value })
                }} className="form-control" aria-describedby="inputGroup-sizing-sm" />
            </td>

            <td>
                <input type="text" value={editedAgency.longName} onChange={(e) => {
                    setEditedAgency({ ...editedAgency, longName: e.target.value })
                }} className="form-control" aria-describedby="inputGroup-sizing-sm" />

            </td>

            {<div className="btn-group" role="group" aria-label="Basic example">

                <button onClick={() => {
                    setEditMode(false)
                    setEditedAgency({ ...agency })
                }} className="btn btn-secondary">Cancel</button>
                <td><button onClick={() => update(editedAgency)} className="btn btn-primary">Update</button>
                </td> </div>}

        </tr>
    }

    return <tr key={agency.agencyId}>
        <td>{agency.shortName}</td>
        <td>{agency.longName}</td>
        {<td>

            <div className="btn-group" role="group" aria-label="Basic example">
                <button onClick={() => deleteById(agency.agencyId)} className="btn btn-danger">Delete</button>
                <button onClick={() => setEditMode(true)} className="btn btn-primary">Edit</button>

                <Link to={`/agency/${agency.agencyId}`} className="btn btn-info">
                    Show
                </Link>
            </div></td>}

    </tr>
}

export default Agency
