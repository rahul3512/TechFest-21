import moment from "moment";
import React, { useEffect, useState } from "react";
import { getUser, updateUser } from "./helper/userapicalls";
import Editbutton from "./assets/images/edit-button.svg";
import ProfileImage from "./assets/images/profile-image.png";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { TextField, FormControlLabel, FormControl, Button, Checkbox, IconButton, MenuItem, Select, InputLabel } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { isAuthenticated } from "../../../auth/helper";
import './assets/css/dashres.css';

import { useAlert } from 'react-alert';


const ProfileI = ({ updateFunction }) => {

    const alert = useAlert();
    const [values, setValues] = useState({
        name: "",
        lastName: "",
        userID: "",
        email: "",
        phone: "",
        dob: new Date(),
        designation: "",
        collegeName: "",
        collegeAddress: "",
        courseEnrolled: "",
        whatsappPhoneNumber: "",
        telegramPhoneNumber: "",
        branchOfStudy: "",
        yearOfStudy: 0,
        loading: false,
        // updated: false,
        error: "",
    });

    const [telegramPhoneNumberCheck, setTelegramPhoneNumberCheck] =
        useState(false);
    const [whatsappPhoneNumberCheck, setWhatsappPhoneNumberCheck] =
        useState(false);

    // const [completeUser, setCompleteUser] = useState(null)

    const {
        name,
        lastName,
        // userID,
        email,
        phone,
        dob,
        designation,
        collegeName,
        collegeAddress,
        courseEnrolled,
        branchOfStudy,
        yearOfStudy,
        whatsappPhoneNumber,
        telegramPhoneNumber,
        loading,
        updated,
        error,
    } = values;

    const { user, token } = isAuthenticated();
    const [userId, setUserId] = useState();
    // console.log(user);
    const preload = (userId, token) => {
        getUser(userId, token).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
                alert.show(`${error}`, {
                    timeout: '3000',
                    type: 'error'
                })
            } else {
                // setCompleteUser(data)
                setValues({
                    ...values,
                    name: data?.name ? data?.name : "",
                    lastName: data?.lastName ? data?.lastName : "",
                    userID: data?.userId ? data?.userId : "",
                    email: data?.email ? data?.email : "",
                    phone: data?.phone ? data?.phone : "",
                    designation: data?.designation ? data?.designation : "",
                    collegeName: data?.collegeName ? data?.collegeName : "",
                    collegeAddress: data?.collegeAddress ? data?.collegeAddress : "",
                    courseEnrolled: data?.courseEnrolled ? data?.courseEnrolled : "",
                    branchOfStudy: data?.branchOfStudy ? data?.branchOfStudy : "",
                    yearOfStudy: data?.yearOfStudy ? data?.yearOfStudy : "",
                    whatsappPhoneNumber: data?.whatsappPhoneNumber ? data?.whatsappPhoneNumber : "",
                    telegramPhoneNumber: data?.telegramPhoneNumber ? data?.telegramPhoneNumber : "",
                    dob: moment(data.dob).format("YYYY-MM-DD"),
                });
            }
        });
    };





    useEffect(() => {
        preload(user._id, token);
        setUserId(user._id);
    }, []);



    const loadingMessage = () => {
        return (
            loading && (
                <div className=" text-center my-2">
                    <div className="spinner-border text-light " role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )
        );
    };



    // const errorMessage = () => (
    //     <div
    //         className="dashboard-dash-alert alert-danger mt-3"
    //         style={{ display: error ? "" : "none" }}
    //     >
    //         <h4>profile updation failed</h4>
    //     </div>
    // );

    const handleChange = (key) => (event) => {
        return setValues({ ...values, [key]: event.target.value });
    };
    const handleCheck = (key) => (event) => {
        if (key === "whatsappPhoneNumber") {
            if (whatsappPhoneNumberCheck === true) {
                setValues({ ...values, [key]: "" });
            } else {
                setValues({ ...values, [key]: phone });
            }

            setWhatsappPhoneNumberCheck(!whatsappPhoneNumberCheck);
        }
        if (key === "telegramPhoneNumber") {
            if (telegramPhoneNumberCheck === true) {
                setValues({ ...values, [key]: "" });
            } else {
                setValues({ ...values, [key]: phone });
            }
            setTelegramPhoneNumberCheck(!telegramPhoneNumberCheck);
        }
    };

    const onSubmit = (event) => {
        event.preventDefault();

        setValues({ ...values, error: "", loading: true, updated: false });

        updateUser(userId, token, {
            name,
            lastName,
            email,
            phone,
            dob,
            designation,
            collegeName,
            collegeAddress,
            courseEnrolled,
            branchOfStudy,
            yearOfStudy,
            whatsappPhoneNumber,
            telegramPhoneNumber,
        })
            .then((data) => {
                if (data.error) {
                    setValues({
                        ...values,
                        error: data.error,
                        loading: false,
                    });
                    alert.show(`${error}`, {
                        type: 'error',
                        timeout: '3000'
                    })
                } else {
                    alert.show("Profile Updated ! ", {
                        timeout: '3000',
                        type: 'success'
                    })

                    updateFunction();

                    setValues({
                        ...values,
                        loading: false,
                        error: "",
                        updated: true,

                    });

                }
            })
            .catch(() => {
                alert.show("user not updated", {
                    timeout: '3000',
                    type: 'error'
                })
            });
        handleClose();
    };






    // Modal values

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const useStyles = makeStyles((theme) => ({
        modal: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            overflow: "scroll",

        },
        paper: {
            position: 'relative',
            backgroundColor: "#2a3249",
            width: "60%",
            ["@media (max-width:780px)"]: {
                // eslint-disable-line no-useless-computed-key
                width: "82%",
                marginTop: "32rem"
            },
            opacity: "1",
            border: "2px solid #000",
            boxShadow: theme.shadows[8],
            padding: theme.spacing(2, 4, 3),
            marginTop: '5rem'
        },

        fontstyle: {
            color: "blue",
            width: "45%",
            ["@media (max-width:780px)"]: {
                // eslint-disable-line no-useless-computed-key
                width: "90%",
            },
            marginBottom: "0.75rem",
            marginRight: "0.3125rem",
            letterSpacing: "1.3px",
        },
        input: {
            color: "white",
            fontSize: "1rem",
            ["@media (max-width:780px)"]: {
                // eslint-disable-line no-useless-computed-key
                fontSize: "0.75rem",
            },
            letterSpacing: "0.06rem",
        },
        inputLabel: {
            color: "white",
            fontSize: "0.975rem",
        },
        right: {

            position: 'absolute',
            right: '5px',
            top: '5px'
        }

    }));

    const ProfileModal = () => {
        const classes = useStyles();
        return (
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={show}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 600,
                    }}
                >
                    <Fade in={show}>
                        <div className={classes.paper}>
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="medium"
                                className={classes.right}
                                onClick={() => {
                                    setShow(false);
                                }}
                            >
                                <CloseIcon fontSize="large" />
                            </IconButton>
                            {loadingMessage()}
                            <h1
                                id="transition-modal-title"
                                style={{ textAlign: "center" }}
                            >
                                Profile Update
                            </h1>

                            <br />
                            <TextField
                                className={classes.fontstyle}
                                type="text"
                                label="Name"
                                value={name}
                                variant="outlined"
                                InputLabelProps={{
                                    className: classes.inputLabel,
                                }}
                                InputProps={{
                                    className: classes.input,
                                }}

                            />
                            <TextField
                                className={classes.fontstyle}
                                type="text"
                                label="Last Name"
                                value={lastName}
                                variant="outlined"
                                InputLabelProps={{
                                    className: classes.inputLabel,
                                }}
                                InputProps={{
                                    className: classes.input,
                                }}
                                onChange={handleChange("lastName")}
                            />
                            <TextField
                                className={classes.fontstyle}
                                type="email"
                                label="Email"
                                value={email}
                                variant="outlined"

                                InputLabelProps={{
                                    className: classes.inputLabel,
                                }}
                                InputProps={{
                                    className: classes.input,
                                }}
                            />
                            <TextField
                                className={classes.fontstyle}
                                type="tel"
                                label="Phone no."
                                value={phone}
                                variant="outlined"
                                InputLabelProps={{
                                    className: classes.inputLabel,
                                }}
                                InputProps={{
                                    className: classes.input,
                                }}
                                onChange={handleChange("phone")}
                            />
                            <TextField
                                className={classes.fontstyle}
                                type="tel"
                                label="Whatsapp Phone no."
                                value={whatsappPhoneNumber}
                                variant="outlined"
                                InputLabelProps={{
                                    className: classes.inputLabel,
                                }}
                                InputProps={{
                                    className: classes.input,
                                }}
                                onChange={handleChange("whatsappPhoneNumber")}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={phone === whatsappPhoneNumber}
                                        onChange={handleCheck("whatsappPhoneNumber")}
                                        name="checkedB"
                                        color="primary"
                                        style={{
                                            transform: "scale(0.875)",
                                        }}
                                    />
                                }
                                label="Same as Phone"
                                style={{ margin: " 0.625rem" }}
                            />

                            <TextField
                                className={classes.fontstyle}
                                type="tel"
                                label="Telegram Phone no."
                                value={telegramPhoneNumber}
                                variant="outlined"
                                InputLabelProps={{
                                    className: classes.inputLabel,
                                }}
                                InputProps={{
                                    className: classes.input,
                                }}
                                onChange={handleChange("telegramPhoneNumber")}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={phone === telegramPhoneNumber}
                                        onChange={handleCheck("telegramPhoneNumber")}
                                        name="checkedB"
                                        color="primary"
                                        style={{ transform: "scale(0.875)" }}
                                    />
                                }
                                label="Same as Phone"
                                style={{ margin: "0.625rem" }}
                            />
                            {/* <TextField
                                className={classes.fontstyle}
                                type="text"
                                label="Designation"
                                value={designation}
                                variant="outlined"
                                InputLabelProps={{
                                    className: classes.inputLabel,
                                }}
                                InputProps={{
                                    className: classes.input,
                                }}
                                onChange={handleChange("designation")}
                            /> */}
                            <TextField
                                className={classes.fontstyle}
                                type="date"
                                label="DOB"
                                value={dob.toString()}
                                onChange={handleChange("dob")}
                                variant="outlined"
                                InputLabelProps={{
                                    className: classes.inputLabel,
                                }}
                                InputProps={{
                                    className: classes.input,
                                }}
                            />
                            <FormControl className={classes.fontstyle} variant="outlined">
                                <InputLabel id="designation" className={classes.inputLabel}>Designation</InputLabel>
                                <Select
                                    labelId="designation"
                                    value={designation}
                                    type="text"
                                    className={classes.input}
                                    onChange={handleChange("designation")}
                                >
                                    <MenuItem value='Student' >Student</MenuItem>
                                    <MenuItem value='Others' >Others</MenuItem>
                                </Select>
                            </FormControl>
                            {designation == 'Student' ?
                                <>
                                    <TextField
                                        className={classes.fontstyle}
                                        type="text"
                                        label="College Name"
                                        value={collegeName}
                                        onChange={handleChange("collegeName")}
                                        variant="outlined"
                                        style={{ width: "90%" }}
                                        InputLabelProps={{
                                            className: classes.inputLabel,
                                        }}
                                        InputProps={{
                                            className: classes.input,
                                        }}
                                    />
                                    <TextField
                                        className={classes.fontstyle}
                                        type="text"
                                        label="College Address"
                                        value={collegeAddress}
                                        variant="outlined"
                                        InputLabelProps={{
                                            className: classes.inputLabel,
                                        }}
                                        InputProps={{
                                            className: classes.input,
                                        }}
                                        onChange={handleChange("collegeAddress")}
                                    />
                                    <TextField
                                        className={classes.fontstyle}
                                        type="text"
                                        label="Course Enrolled"
                                        value={courseEnrolled}
                                        variant="outlined"
                                        InputLabelProps={{
                                            className: classes.inputLabel,
                                        }}
                                        InputProps={{
                                            className: classes.input,
                                        }}
                                        onChange={handleChange("courseEnrolled")}
                                    />
                                    <TextField
                                        className={classes.fontstyle}
                                        type="text"
                                        label="Branch Of Study"
                                        value={branchOfStudy}
                                        variant="outlined"
                                        InputLabelProps={{
                                            className: classes.inputLabel,
                                        }}
                                        InputProps={{
                                            className: classes.input,
                                        }}
                                        onChange={handleChange("branchOfStudy")}
                                    />
                                    <TextField
                                        className={classes.fontstyle}

                                        type="number"

                                        label="Year Of Study"
                                        value={yearOfStudy}
                                        variant="outlined"
                                        InputLabelProps={{
                                            className: classes.inputLabel,
                                        }}
                                        InputProps={{
                                            className: classes.input,
                                            inputProps: {
                                                min: 1,
                                                max: 7
                                            }
                                        }}
                                        onChange={handleChange("yearOfStudy")}
                                    />

                                </> :
                                <>
                                    <TextField
                                        className={classes.fontstyle}
                                        type="text"
                                        label="Organization Name"
                                        value={collegeName}
                                        onChange={handleChange("collegeName")}
                                        variant="outlined"
                                        style={{ width: "90%" }}
                                        InputLabelProps={{
                                            className: classes.inputLabel,
                                        }}
                                        InputProps={{
                                            className: classes.input,
                                        }}
                                    />
                                    <TextField
                                        className={classes.fontstyle}
                                        type="text"
                                        label="Home Address"
                                        value={collegeAddress}
                                        variant="outlined"
                                        style={{ width: (designation == 'Others' ? "90%" : "") }}
                                        InputLabelProps={{
                                            className: classes.inputLabel,
                                        }}
                                        InputProps={{
                                            className: classes.input,
                                        }}
                                        onChange={handleChange("collegeAddress")}
                                    />
                                </>
                            }
                            <br />
                            <div style={{ textAlign: 'center' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={onSubmit}

                                    mx="auto"
                                    style={{ padding: "8px 20px", fontSize: "1.25rem" }}
                                >
                                    Update
                                </Button>
                            </div>
                        </div>
                    </Fade>
                </Modal>
            </div>
        );
    }
    const ProfileInformation = () => {
        return (

            <>
                {ProfileModal()}
                <div className="dashboard-dash-profile" id="profile">
                    <div className="dashboard-dash-profile-information">
                        <div className="dashboard-dash-section-heading">
                            <div className="dashboard-dash-section-heading_text">
                                <h3 className="dashboard-dash-section-heading_heading">Profile Information</h3>
                                <p className="dashboard-dash-section-heading_information">
                                    Basic info, like your name ,Profession etc.
                                </p>
                            </div>
                            <img
                                onClick={handleShow}
                                src={Editbutton}
                                alt="edit-button"
                                className="dashboard-dash-section-heading_edit"
                            />
                        </div>
                        <div className="dashboard-dash-profile-information_card dashboard-dash-card">
                            <div className="dashboard-dash-profile-information_info">
                                <div className="dashboard-dash-pi_personal-info">
                                    <div className="dashboard-dash-pi_info-group">
                                        <div className="dashboard-dash-info-group_que">Profession</div>
                                        <div className="dashboard-dash-info-group_ans">{values?.designation}</div>
                                    </div>
                                    <div className="dashboard-dash-pi_info-group">
                                        <div className="dashboard-dash-info-group_que">
                                            Organisation/College Name
                                        </div>
                                        <div className="dashboard-dash-info-group_ans">{values?.collegeName}</div>
                                    </div>
                                    <div className="dashboard-dash-pi_info-group">
                                        <div className="dashboard-dash-info-group_que">
                                            Course Enrolled in
                                            {/* <span className="dashboard-dash-info-group_que_condition">
                        (only applicable on college students)
                      </span> */}
                                        </div>
                                        <div className="dashboard-dash-info-group_ans">
                                            {values?.courseEnrolled}
                                        </div>
                                    </div>
                                    <div className="dashboard-dash-pi_info-group">
                                        <div className="dashboard-dash-info-group_que">
                                            Year of Study
                                            {/* <span className="dashboard-dash-info-group_que_condition">
                        (only applicable on college students)
                      </span> */}
                                        </div>
                                        <div className="dashboard-dash-info-group_ans">{values?.yearOfStudy}</div>
                                    </div>
                                    <div className="dashboard-dash-pi_info-group">
                                        <div className="dashboard-dash-info-group_que">Date of Birth</div>
                                        <div className="dashboard-dash-info-group_ans">
                                            {values?.dob.toString()}
                                        </div>
                                    </div>
                                </div>
                                <div className="dashboard-dash-pi-heading">
                                    Contact Information
                                    <hr />
                                </div>
                                <div className="dashboard-dash-pi-contact-information">
                                    <div className="dashboard-dash-pi_info-group">
                                        <div className="dashboard-dash-info-group_que">E-mail Address</div>
                                        <div className="dashboard-dash-info-group_ans">{values?.email}</div>
                                    </div>
                                    <div className="dashboard-dash-pi_info-group">
                                        <div className="dashboard-dash-info-group_que">Phone Number</div>
                                        <div className="dashboard-dash-info-group_ans">{values?.phone}</div>
                                    </div>
                                    <div className="dashboard-dash-pi_info-group">
                                        <div className="dashboard-dash-info-group_que">WhatsApp Number</div>
                                        <div className="dashboard-dash-info-group_ans">
                                            {values?.whatsappPhoneNumber}
                                        </div>
                                    </div>
                                    <div className="dashboard-dash-pi_info-group">
                                        <div className="dashboard-dash-info-group_que">Telegram Number</div>
                                        <div className="dashboard-dash-info-group_ans">
                                            {values?.telegramPhoneNumber}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="dashboard-dash-profile-information_pic">
                                <div className="dashboard-dash-pi-photo-group">
                                    <img src={ProfileImage} alt="profile-image" />
                                    <div className="dashboard-dash-pi-photo-group_name">{`${values?.name} ${values?.lastName}`}</div>
                                    <div className="dashboard-dash-pi-photo-group_tag">{values?.userID}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };


    return (
        <>
            {
                ProfileInformation()
                // profileForm()
            }

        </>
    );
};

export default ProfileI;
