import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Agency from "./Agency";


function AgencyFetch() {
    const [agencies, setAgencies] = useState([]);


    useEffect(() => {
        fetch("http://localhost:8080/api/agency")
            .then(response => {
                if (response.status !== 200) {
                    return Promise.reject("Agency fetch failed");
                }
                return response.json();
            })
            .then(json => setAgencies(json))
            .catch(console.log);
    }, []);

  
    // Delete by Id

    const deleteById = (id) => {
        return fetch(`http://localhost:8080/api/agency/${id}`, { method: "DELETE" })
            .then(response => {
                if (response.status === 204) {
                    setAgencies(agencies.filter(a => a.agencyId !== id));

                } else if (response.status === 404) {
                    return Promise.reject("Agency not found")
                } else {
                    return Promise.reject(`Delete failed with status: ${response.status}`);
                }
            })
            .catch(console.log);
    }

    // Update

    const update = (agency) => {
        const init = {
            method: "PUT",
            headers: {
                "content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(agency)
        };

        return fetch(`http://localhost:8080/api/agency/${agency.agencyId}`, init)
            .then(response => {
                if (response.status === 404) {
                    return Promise.reject("Agency not found")
                } else if (response.status === 204) {
                    setAgencies(agencies.map(a => (a.agencyId === agency.agencyId ? agency : a)))
                } else {
                    return Promise.reject(`Update failed with status: ${response.status}`);
                }

            })
            .catch(console.log);
    }

   return(
        <div className="container-sm">

            <h1>Agency</h1>

            <Link to={`/agency/add`} className="btn btn-success">
                Add Agency
            </Link>

            <table className="table table-striped">
                <thead>
                    <tr>

                        <th scope="col">Short Name</th>
                        <th scope="col">Long Name</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {agencies.map(a => <Agency agency={a} deleteById={deleteById} updateAgency={update} />)}

                </tbody>
            </table>
        </div>

   );

}

export default AgencyFetch;