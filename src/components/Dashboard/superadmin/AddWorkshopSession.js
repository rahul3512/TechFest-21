import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../../../auth/helper';
import Base from '../Base';
// import { getCoordinators } from './helper/coordinatorApiCalls';
import { getworkshops } from './helper/workshopApiCalls';
import { createWorkshopSession } from './helper/workshopSessionApiCalls';


const WorkshopSession = () => {


    const { user, token } = isAuthenticated();
    const [workshops, setWorkshops] = useState([]);
    const [values, setValues] = useState({
        workshopSessionName: "",
        dateTime: "",
        scheduledLink: "",


        workshopId: "",

        loading: false,
        error: "",
        createdWorkshopSession: "",
        formData: new FormData()

    });



    const {
        workshopSessionName,
        dateTime,
        scheduledLink,


        workshopId, loading, error, createdWorkshopSession, formData
    } = values;


    const handleInputs = (e) => {
        let name = e.target.name;
        var value = e.target.value;




        formData.set(name, value);
        setValues({ ...values, [name]: value });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        setValues({ ...values, error: "", loading: true });

        createWorkshopSession(user._id, token, formData)
            .then(data => {
                console.log(data)
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {

                    setValues({
                        ...values,
                        workshopSessionName: "",

                        dateTime: "",
                        scheduledLink: "",


                        workshopId: "",

                        formData: new FormData(),
                        createdWorkshopSession: data.workshopSession1.workshopSessionName,
                        loading: false,
                        error: ""
                    });


                }
            })
            .catch(err => console.log(err));

        console.log(values)
    }

    const workshopSessionForm = () => {
        return (
            <form>


                WorkshopSession Name:
                <input type="text" placeholder="Enter your name" name="workshopSessionName" value={workshopSessionName} onChange={handleInputs} />
                Date Time:
                <input type="datetime-local" placeholder="Enter datae of event" name="dateTime" value={dateTime} onChange={handleInputs} />
                scheduledLink:

                <input type="text" placeholder="Enter meeting url" name="scheduledLink" value={scheduledLink} onChange={handleInputs} />



                <label for="workshopId">Worshops</label>

                <select name="workshopId" id="workshopId" value={workshopId} onChange={handleInputs}>
                    <option value="">Select a workshop</option>
                    {workshops &&
                        workshops.map((workshop, index) => {

                            return (
                                <option key={index} value={workshop._id}>
                                    {workshop.workshopName}
                                </option>
                            );
                        })}
                </select>
                <input type="submit" name="submit" onClick={onSubmit} />

            </form>

        )
    }

    const successMessage = () => (
        <div
            className="alert alert-success mt-3"
            style={{ display: createdWorkshopSession ? "" : "none" }}
        >
            <h4>{createdWorkshopSession} created successfully</h4>
        </div>
    );
    const errorMessage = () => (
        <div
            className="alert alert-danger mt-3"
            style={{ display: error ? "" : "none" }}
        >
            <h4>WorkshopSession creation failed</h4>
        </div>
    );





    const preload = () => {
        getworkshops().then(data => {

            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setWorkshops(data)



            }

        });
    };


    useEffect(() => {
        preload();
    }, []);
    return (
        <Base title="workshopSession creation page">



            {successMessage()}
            {errorMessage()}
            {workshopSessionForm()}

        </Base>
    )

}



export default WorkshopSession;
