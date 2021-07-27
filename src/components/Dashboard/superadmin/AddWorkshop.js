import React, { useState, useRef, useEffect } from 'react'
import { isAuthenticated } from '../../../auth/helper';
import Base from '../Base';
import { getCoordinators } from './helper/coordinatorApiCalls';
import { createWorkshop } from './helper/workshopApiCalls';


const Workshop = () => {
    const ref = React.useRef();



    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
        workshopName: "",
        workshopDescription: "",
        hostName: "",
        hostDescription: "",

        studentCoordinator: [],

        photo: "",

        startDate: "",
        endDate: "",
        whatsappGroupLink: "",
        // photoField: "",
        loading: false,
        error: "",
        createdWorkshop: "",
        formData: new FormData()

    });


    const [coordinators, setCoordinators] = useState([])
    const [studentCoordinatorVal, setStudentCoordinatorVal] = useState([])

    const {
        workshopName,
        workshopDescription,
        studentCoordinator,
        hostName,
        hostDescription, startDate,
        endDate,
        whatsappGroupLink, photo, loading, error, createdWorkshop, formData
    } = values;


    const handleInputs = (e) => {
        let name = e.target.name;
        var value;
        value = name === "photo" ? e.target.files[0] : e.target.value;
        if (name === "studentCoordinator1") {
            let a = studentCoordinatorVal
            a[0] = e.target.value
            value = a;
            setStudentCoordinatorVal(a)
            name = "studentCoordinator"
            // setValues({ ...setValues, studentCoordinatorVal: e.target.value })
        } else if (name === "studentCoordinator2") {
            let a = studentCoordinatorVal
            a[1] = e.target.value
            value = a;
            setStudentCoordinatorVal(a)
            name = "studentCoordinator"
            // setValues({ ...setValues, studentCoordinatorVal: e.target.value })
        }




        formData.set(name, value);
        setValues({ ...values, [name]: value });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        setValues({ ...values, error: "", loading: true });

        createWorkshop(user._id, token, formData)
            .then(data => {
                console.log(data)
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    ref.current.value = ""
                    setValues({
                        ...values,
                        workshopName: "",
                        workshopDescription: "",
                        studentCoordinator: [],
                        hostName: "",
                        hostDescription: "",
                        photo: "",

                        startDate: "",
                        endDate: "",
                        whatsappGroupLink: "",
                        formData: new FormData(),
                        createdWorkshop: data.workshop1.workshopName,
                        loading: false,
                        error: ""
                    });

                    setStudentCoordinatorVal([]);

                }
            })
            .catch(err => console.log(err));

        console.log(values)
    }

    const workshopForm = () => {
        return (
            <form>
                Upload Image:
                <input
                    onChange={handleInputs}
                    type="file"
                    name="photo"
                    accept="image"
                    placeholder="choose a file"
                    ref={ref}
                />

                Workshop Name:
                <input type="text" placeholder="Enter your name" name="workshopName" value={workshopName} onChange={handleInputs} />

                Description:
                <textarea name="workshopDescription" placeholder="Description" id="description" cols="30"
                    rows="10" onChange={handleInputs} value={workshopDescription}></textarea>

                <label for="studentCoordinator1">Student Coordinator - 1</label>

                <select name="studentCoordinator1" id="studentCoordinator1" value={studentCoordinatorVal[0]} onChange={handleInputs}>
                    <option value="">Select a student coordinator</option>
                    {coordinators &&
                        coordinators.map((coordinator, index) => {
                            if (coordinator.coordinatorType === "Student")
                                return (
                                    <option key={index} value={coordinator._id}>
                                        {coordinator.coordinatorName}
                                    </option>
                                );
                        })}
                </select>

                <label for="studentCoordinator">Student Coordinator - 2</label>

                <select name="studentCoordinator2" id="studentCoordinator2" value={studentCoordinatorVal[1]} onChange={handleInputs}>
                    <option value="">Select a student coordinator</option>
                    {coordinators &&
                        coordinators.map((coordinator, index) => {
                            if (coordinator.coordinatorType === "Student")
                                return (
                                    <option key={index} value={coordinator._id}>
                                        {coordinator.coordinatorName}
                                    </option>
                                );
                        })}
                </select>

                Host Name:
                <input type="text" placeholder="Enter host name" name="hostName" value={hostName} onChange={handleInputs} />

                Description:
                <textarea name="hostDescription" placeholder="Description" id="description" cols="30"
                    rows="10" onChange={handleInputs} value={hostDescription}></textarea>

                start date:
                <input type="datetime-local" name="startDate" value={startDate} onChange={handleInputs} />
                end date:
                <input type="datetime-local" name="endDate" value={endDate} onChange={handleInputs} />

                whatsappGroupLink
                <input type="text" name="whatsappGroupLink" value={whatsappGroupLink} onChange={handleInputs} />

                <input type="submit" name="submit" onClick={onSubmit} />

            </form>

        )
    }

    const successMessage = () => (
        <div
            className="alert alert-success mt-3"
            style={{ display: createdWorkshop ? "" : "none" }}
        >
            <h4>{createdWorkshop} created successfully</h4>
        </div>
    );
    const errorMessage = () => (
        <div
            className="alert alert-danger mt-3"
            style={{ display: error ? "" : "none" }}
        >
            <h4>Workshop creation failed</h4>
        </div>
    );





    const preload = () => {
        getCoordinators().then(data => {

            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCoordinators(data)



            }

        });
    };


    useEffect(() => {
        preload();
    }, []);
    return (
        <Base title="workshop creation page">

            {workshopForm()}


            {successMessage()}
            {errorMessage()}
        </Base>
    )

}



export default Workshop;
