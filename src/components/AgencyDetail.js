import { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";



function AgencyDetail() {

    const [agencyDetails, setAgencyDetails] = useState({});
    const { agencyId } = useParams();
    const [agents, setAgents] = useState([]);
    let history = useHistory();

    useEffect(() => {
        fetch(`http://localhost:8080/api/agency/${agencyId}`)
            .then(response => {
                if (response.status !== 200) {
                    return Promise.reject("Agency fetch failed");
                }
                return response.json();
            })
            .then(json => {
                setAgencyDetails(json)
                setAgents(json.agents)

            })
            .catch(console.log);
    }, []);
   

    return (
        <div className="container-sm">

            <h1>Agency details</h1>
            <table className="table table-striped">
                <thead>
                    <tr>

                        <th scope="col">Short Name</th>
                        <th scope="col">Long Name</th>
                        <th scope="col">Locations</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{agencyDetails.shortName}</td>
                        <td>{agencyDetails.longName}</td>
                        <td>{agencyDetails.locations?.map(a => a.city).join(', ')}</td>
                       
                    </tr>

                </tbody>
            </table>
            <h2>Agents</h2>
            
            <Link to={`/agency-agent/add/${agencyId}`} className="btn btn-success">
                Add Agent
            </Link>
           
            <table className="table table-striped">
                <thead>
                    <tr>

                        <th scope="col">Name</th>
                        <th scope="col">Identifier</th>
                        <th scope="col">Activation Date</th>
                        <th scope="col">Active</th>
                        <th scope="col">security Clearance</th>
                    </tr>
                </thead>
                <tbody>
                
                    {agencyDetails.agents?.map(a => {
                        return <tr>
                            <td>{a.agent.firstName} {a.agent.lastName}</td>
                            <td>{a.identifier}</td>
                            <td>{a.activationDate}</td>
                            <td>{a.active ? 'Yes' : 'No'}</td>
                            <td>{a.securityClearance.name}</td>
                        </tr>
                    })} 

                </tbody>
            </table>
           
           
            <td><button onClick={history.goBack} className="btn btn-secondary">Back</button></td>
        </div>


    );
}



export default AgencyDetail;

