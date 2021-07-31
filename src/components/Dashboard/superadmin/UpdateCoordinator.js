import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../../../auth/helper';
import Base from '../Base';
import { getCoordinator, updateCoordinator } from './helper/coordinatorApiCalls';


const UpdateCoordinator = ({ match }) => {
    const ref = React.useRef();



    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
        coordinatorName: "",
        coordinatorPhone: "",
        coordinatorEmail: "",
        coordinatorDesignation: "",
        coordinatorType: "",
        photo: "",
        // photoField: "",
        loading: false,
        error: "",
        updatedCoordinator: "",
        formData: new FormData()

    });

    const {
        coordinatorName,
        coordinatorPhone,
        coordinatorEmail,
        coordinatorDesignation,
        coordinatorType,
        // photo, loading,
        error, updatedCoordinator, formData
    } = values;

    const preload = (coordinatorId) => {
        getCoordinator(coordinatorId).then(data => {

            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {

                setValues({
                    ...values,

                    coordinatorName: data.coordinatorName,
                    coordinatorPhone: data.coordinatorPhone,
                    coordinatorEmail: data.coordinatorEmail,
                    coordinatorDesignation: data.coordinatorDesignation,
                    coordinatorType: data.coordinatorType,
                    photo: data.photo,


                    loading: false,
                    error: "",
                    formData: new FormData()
                });

            }
        });
    }

    useEffect(() => {
        preload(match.params.coordinatorId)
    }, [])



    const handleInputs = (e) => {
        let name = e.target.name;
        var value;
        if (name === "photo") {
            value = e.target.files[0];
            // let photoField1 = value
            // setValues({ ...values, photoField: photoField1 });
        } else {
            value = e.target.value;
        }
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        setValues({ ...values, error: "", loading: true });

        updateCoordinator(user._id, match.params.coordinatorId, token, formData)
            .then(data => {
                console.log(data)
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    ref.current.value = ""
                    setValues({
                        ...values,
                        coordinatorName: data.coordinator.coordinatorName,
                        coordinatorPhone: data.coordinator.coordinatorPhone,
                        coordinatorEmail: data.coordinator.coordinatorEmail,
                        coordinatorDesignation: data.coordinator.coordinatorDesignation,
                        coordinatorType: data.coordinator.coordinatorType,
                        photo: data.coordinator.photo,

                        formData: new FormData(),
                        updatedCoordinator: data.coordinator.coordinatorName,
                        loading: false,
                        error: ""
                    });

                }
            })
            .catch(err => console.log(err));

        console.log(values)
    }

    const coordinatorForm = () => {
        return (
            <form>
                <table>

                    <tr>
                        <td><label>Coordinator Name</label></td>
                        <td><input type="text" name="coordinatorName"
                            value={coordinatorName}
                            onChange={handleInputs}
                            placeholder="Enter your name"
                        /></td>
                    </tr>

                    <tr>
                        <td><label>Phone Number</label></td>
                        <td><input type="tel" name="coordinatorPhone" id="phone"
                            value={coordinatorPhone}
                            onChange={handleInputs}
                            placeholder="Enter your number"
                        /></td>
                    </tr>
                    <tr>
                        <td><label>Email</label></td>
                        <td><input type="email" name="coordinatorEmail"
                            value={coordinatorEmail}
                            onChange={handleInputs}
                            placeholder="Enter your email"
                        /></td>
                    </tr>
                    <tr>
                        <td><label>Coordinator Type</label></td>
                        <td><select name="coordinatorType" id="coordinatorType" value={coordinatorType} onChange={handleInputs}>
                            <option value="">Select Coordinator Type</option>
                            <option value="Faculty">Faculty</option>
                            <option value="Student">Student</option>

                        </select></td>
                    </tr>
                    <tr>
                        <td><label>Designation</label></td>
                        <td><input type="text" name="coordinatorDesignation"
                            value={coordinatorDesignation}
                            onChange={handleInputs}
                            placeholder="Enter your designation"
                        /></td>
                    </tr>
                    <tr>

                        <input
                            onChange={handleInputs}
                            type="file"
                            name="photo"
                            accept="image"
                            placeholder="choose a file"
                            ref={ref}
                        />
                    </tr>
                </table >

                <div>
                    <input type="submit" onClick={onSubmit} />
                </div>
            </form >

        )
    }
    const successMessage = () => (
        <div
            className="alert alert-success mt-3"
            style={{ display: updatedCoordinator ? "" : "none" }}
        >
            <h4>{updatedCoordinator} updated successfully</h4>
        </div>
    );
    const errorMessage = () => (
        <div
            className="alert alert-danger mt-3"
            style={{ display: error ? "" : "none" }}
        >
            <h4>Coordinator creation failed</h4>
        </div>
    );

    return (
        <Base title="Coordinator update page">


            {successMessage()}
            {errorMessage()}
            {coordinatorForm()}
        </Base>
    )

}



export default UpdateCoordinator;
