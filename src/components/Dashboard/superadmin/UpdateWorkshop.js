import moment from 'moment';
import React, { useState, useRef, useEffect } from 'react'
import { isAuthenticated } from '../../../auth/helper';
import Base from '../Base';
import { getCoordinators } from './helper/coordinatorApiCalls';
import { getWorkshop, updateWorkshop } from './helper/workshopApiCalls';


const UpdateWorkshop = ({ match }) => {
    const ref = useRef();



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
        updatedWorkshop: "",
        formData: new FormData()

    });


    const [coordinators, setCoordinators] = useState([])
    const [studentCoordinatorVal, setStudentCoordinatorVal] = useState("")

    const {
        workshopName,
        workshopDescription,
        // studentCoordinator,
        hostName,
        hostDescription, startDate,
        endDate,
        whatsappGroupLink,
        // photo,
        // loading,
        error, updatedWorkshop, formData
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

        updateWorkshop(user._id, match.params.workshopId, token, formData)
            .then(data => {
                console.log(data)
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    ref.current.value = ""
                    setValues({
                        ...values,
                        workshopName: data.workshop1.workshopName,
                        workshopDescription: data.workshop1.workshopDescription,
                        studentCoordinator: data.workshop1.studentCoordinator,
                        hostName: data.workshop1.hostName,
                        hostDescription: data.workshop1.hostDescription,
                        photo: data.workshop1.photo,

                        startDate: data.workshop1.startDate,
                        endDate: data.workshop1.endDate,
                        whatsappGroupLink: data.workshop1.whatsappGroupLink,
                        formData: new FormData(),
                        updatedWorkshop: data.workshop1.workshopName,
                        loading: false,
                        error: ""
                    });

                    setStudentCoordinatorVal([data.workshop1.studentCoordinator[0]?._id, data.workshop1.studentCoordinator[1]?._id]);

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

                <label for="studentCoordinator2">Student Coordinator - 2</label>

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
                {/* {moment.utc(startDate).format()} */}
                start date:
                <input type="datetime-local" name="startDate" value={moment.utc(startDate).format('YYYY-MM-DD[T]HH:mm:ss')} onChange={handleInputs} />
                end date:
                <input type="datetime-local" name="endDate" value={moment.utc(endDate).format('YYYY-MM-DD[T]HH:mm:ss')} onChange={handleInputs} />

                whatsappGroupLink
                <input type="text" name="whatsappGroupLink" value={whatsappGroupLink} onChange={handleInputs} />

                <input type="submit" name="submit" onClick={onSubmit} />

            </form>

        )
    }

    const successMessage = () => (
        <div
            className="alert alert-success mt-3"
            style={{ display: updatedWorkshop ? "" : "none" }}
        >
            <h4>{updatedWorkshop} updated successfully</h4>
        </div>
    );
    const errorMessage = () => (
        <div
            className="alert alert-danger mt-3"
            style={{ display: error ? "" : "none" }}
        >
            <h4>Workshop updation failed</h4>
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

    const preloadWorkshop = (workshopId) => {
        getWorkshop(workshopId).then(data => {
            console.log(data);
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {

                setValues({
                    ...values,


                    workshopName: data.workshop?.workshopName,
                    workshopDescription: data.workshop?.workshopDescription,
                    hostName: data.workshop?.hostName,
                    hostDescription: data.workshop?.hostDescription,

                    studentCoordinator: data.workshop.studentCoordinator,

                    photo: data.workshop?.photo,

                    startDate: data.workshop?.startDate,
                    endDate: data.workshop?.endDate,
                    whatsappGroupLink: data.workshop?.whatsappGroupLink,
                    // photoField: "",
                    loading: false,
                    error: "",

                    formData: new FormData()
                });
                setStudentCoordinatorVal([data.workshop.studentCoordinator[0]._id, data.workshop.studentCoordinator[1]?._id])

            }
        });
    }

    useEffect(() => {
        preload();
        preloadWorkshop(match.params.workshopId)
    }, []);
    return (
        <Base title="workshop updation page">
            {successMessage()}
            {errorMessage()}
            {workshopForm()}



        </Base>
    )

}



export default UpdateWorkshop;
