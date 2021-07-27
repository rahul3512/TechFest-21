import React, { useState, useRef, useEffect } from 'react'
import { isAuthenticated } from '../../../auth/helper';
import Base from '../Base';
import { getCoordinators } from './helper/coordinatorApiCalls';
import { updateDomain, getDomain } from './helper/domainApiCalls';



const UpdateDomain = ({ match }) => {
    const ref = React.useRef();



    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
        domainName: "",
        domainDescription: "",
        studentCoordinator: [],

        facultyCoordinator: [],
        photo: "",

        // photoField: "",
        loading: false,
        error: "",
        updatedDomain: "",
        formData: new FormData()

    });


    const [coordinators, setCoordinators] = useState([])
    const [studentCoordinatorVal, setStudentCoordinatorVal] = useState("")
    const [facultyCoordinatorVal, setFacultyCoordinatorVal] = useState("")
    const {
        domainName,
        domainDescription,
        studentCoordinator,
        facultyCoordinator, photo, loading, error, createdDomain, formData, updatedDomain
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
        else if (name === "facultyCoordinator") {
            let a = [];
            // facultyCoordinator.map(fc => {
            //     a.push(fc)
            // })
            a.push(e.target.value)
            value = a;

            setFacultyCoordinatorVal(e.target.value)
        }


        formData.set(name, value);
        setValues({ ...values, [name]: value });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        setValues({ ...values, error: "", loading: true });

        updateDomain(user._id, token, match.params.domainId, formData)
            .then(data => {
                console.log(data)
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    ref.current.value = ""
                    setValues({
                        ...values,
                        domainName: data.domain1.domainName,
                        domainDescription: data.domain1.domainDescription,
                        studentCoordinator: data.domain1.studentCoordinator,

                        facultyCoordinator: data.domain1.facultyCoordinator,
                        photo: data.domain1.photo,

                        // photoField: "",
                        loading: false,
                        error: "",
                        formData: new FormData(),

                        updatedDomain: data.domain1.domainName


                    });

                    setStudentCoordinatorVal([data.domain1.studentCoordinator[0]?._id, data.domain1.studentCoordinator[1]?._id]);
                    setFacultyCoordinatorVal(data.domain1.facultyCoordinator[0]?._id);

                }
            })
            .catch(err => console.log(err));

        console.log(values)
    }

    const domainForm = () => {
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

                Domain Name:
                <input type="text" placeholder="Enter your name" name="domainName" value={domainName} onChange={handleInputs} />

                Description:
                <textarea name="domainDescription" placeholder="Description" id="description" cols="30"
                    rows="10" onChange={handleInputs} value={domainDescription} />

                <label for="studentCoordinator">Student Coordinator - 1</label>

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


                <label for="facultyCoordinator">Faculty Coordinator </label>

                <select name="facultyCoordinator" id="facultyCoordinator" value={facultyCoordinatorVal} onChange={handleInputs}>
                    <option value="">Select a faculty coordinator</option>
                    {coordinators &&
                        coordinators.map((coordinator, index) => {
                            if (coordinator.coordinatorType === "Faculty")
                                return (
                                    <option key={index} value={coordinator._id}>
                                        {coordinator.coordinatorName}
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
            style={{ display: updatedDomain ? "" : "none" }}
        >
            <h4>{domainName} updated successfully</h4>
        </div>
    );
    const errorMessage = () => (
        <div
            className="alert alert-danger mt-3"
            style={{ display: error ? "" : "none" }}
        >
            <h4>Domain updation failed</h4>
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

    const preloadDomain = domainId => {
        getDomain(domainId).then(data => {
            console.log(data);
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {

                setValues({
                    ...values,


                    domainName: data.domain.domainName,
                    domainDescription: data.domain.domainDescription,
                    studentCoordinator: data.domain.studentCoordinator,

                    facultyCoordinator: data.domain.facultyCoordinator,
                    photo: data.domain.photo,

                    // photoField: "",
                    loading: false,
                    error: "",
                    formData: new FormData()
                });
                setStudentCoordinatorVal([data.domain.studentCoordinator[0]._id, data.domain.studentCoordinator[1]?._id])
                setFacultyCoordinatorVal(data.domain.facultyCoordinator[0]._id)
            }
        });
    };
    useEffect(() => {
        preload();
        preloadDomain(match.params.domainId);
    }, []);
    return (
        <Base title="domain creation page">

            {domainForm()}

            {JSON.stringify(values)}
            {successMessage()}
            {errorMessage()}
        </Base>
    )

}



export default UpdateDomain;
