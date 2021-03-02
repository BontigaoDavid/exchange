import React, { Component } from 'react';
import styles from "./login.module.css";
import encryptor from "../../algorithms/encryption.js";
import Axios from "axios";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            interface: 0,
            email: "",
            password: "",
            isPasswordLong: false,
            isPasswordLowercase: false,
            isPasswordUppercase: false,
            isPasswordNumber: false,
            isPasswordSpecial: false,
            isPasswordConfirmed: false,
            isEmailValid: false,
            isZipcodeValid: false
        };
    }

    onInputchange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    onZipcodechange = (event) => {
        let zipcode = event.target.value;

        
        if (zipcode.length < 6)
        this.setState({
            zipcode: zipcode
        });

        if (zipcode.length === 5) {
            this.setState({ isZipcodeValid: true });
        }

        else {
            this.setState({ isZipcodeValid: false });
        }
    }

    onNumberChange = (event) => {
        let number = event.target.value;

        if (number.length < 11)
        this.setState({
            number: number
        });

        if (number.length === 10) {
            this.setState({ isNumberValid: true });
        }

        else {
            this.setState({ isNumberValid: false });
        }
    }

    onConfirmPasswordchange = (event) => {
        let confirmPassword = event.target.value;
        this.setState({
            confirmPassword: confirmPassword
        });
        
        if (confirmPassword === this.state.password) {
            this.setState({ isPasswordConfirmed: true })
        }

        else {
            this.setState({ isPasswordConfirmed: false })
        }
    }

    onPasswordchange = (event) => {
        let password = event.target.value;
        let specialCharacters = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

        this.setState({
            password: password
        });

        if (specialCharacters.test(password)) {
            this.setState({ isPasswordSpecial: true });
        }
        else {
            this.setState({ isPasswordSpecial: false });
        }

    
        if (password.length > 7 ) {
            this.setState({ isPasswordLong: true });
        }
        else {
            this.setState({ isPasswordLong: false });
        }


        if (/[a-z]/.test(password)) {
            this.setState({ isPasswordLowercase: true });
        } 
        else {
            this.setState({ isPasswordLowercase: false });
        }


        if (/[A-Z]/.test(password)) {
            this.setState({ isPasswordUppercase: true });
        } 
        else {
            this.setState({ isPasswordUppercase: false });
        }


        if (/[0-9]/.test(password)) {
            this.setState({ isPasswordNumber: true });
        } 
        else {
            this.setState({ isPasswordNumber: false });
        }
    }

    onEmailchange = (event) => {
        let email = event.target.value;
        let emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        this.setState({
            [event.target.name]: event.target.value
        });

        if (emailRegEx.test(email)) {
            this.setState({ isEmailValid: true });
        }
        else {
            this.setState({ isEmailValid: false });
        }
    }

    submitEmail = () => {
        fetch('/api/users/login/' + this.state.email)
        .then(res => res.json())
        .then(
            (result) => {
                if (result.publicKey) {
                    this.setState({
                        interface: 1,
                        firstName: result.firstname,
                        publicKey: result.publicKey
                    });
                }

                else {
                    this.setState({
                        signInError: true
                    });
                }
            }
        )
    }

    submitPassword = () => {
        let credentials = {
            email: this.state.email,
            password: this.state.password
        }

        console.log(credentials);

        let encryptedCredentials = encryptor.publicEncrypt(this.state.publicKey, JSON.stringify(credentials));
        
        console.log(encryptedCredentials);

        Axios.post("/api/users/login/", { hash: encryptedCredentials });

        this.setState({ interface: 2 })
    }

    submitForm = () => {
        if 
        (
            this.state.isPasswordLong &&
            this.state.isPasswordLowercase &&
            this.state.isPasswordUppercase &&
            this.state.isPasswordNumber &&
            this.state.isPasswordSpecial &&
            this.state.isEmailValid &&
            this.state.firstName &&
            this.state.lastName &&
            this.state.email &&
            this.state.address &&
            this.state.city &&
            this.state.state &&
            this.state.zipcode &&
            this.state.country &&
            this.state.password &&
            this.state.isPasswordConfirmed &&
            this.state.isZipcodeValid
        ) 
        {
            this.setState({ interface: 4});
        }

        else {
            alert("Please complete entire form");
        }
    }

    render = () => {
        switch (this.state.interface) {

            //Login
            case 0:
                return (
                    <div className={styles["login-container"]}>
                        <div className={styles.title}>
                            Sign In
                        </div>
                        <div className={styles.subtitle}>
                            to access your account
                        </div>
                        <div>
                            <input className={styles["email-input"]} placeholder="Email" name="email" value={this.state.email} onChange={this.onInputchange}/>
                        </div>
                        <div className={styles["email-error"]}>
                            {(this.state.signInError ? "Email does not exist" : "")}
                        </div>
                        <div className={styles["buttons-container"]}>
                            <button className={styles["signup-button"]} onClick={() => this.setState({ interface: 3, firstName: "",  })}>Create account</button>
                            <button className={styles["next-button"]} onClick={() => this.setState(this.submitEmail)}>Next</button>
                        </div>
                    </div>
                );

            //Enter Password
            case 1:
                return (
                    <div className={styles["login-container"]}>
                        <div className={styles.title}>
                            Welcome, {this.state.firstName}
                        </div>
                        <div className={styles.subtitle}>
                            Enter password for {this.state.email}
                        </div>
                        <div>
                            <input className={styles["email-input"]} placeholder="Password" type="password" name="password" value={this.state.password} onChange={this.onInputchange}/>
                        </div>
                        <div className={styles["buttons-container"]}>
                            <button className={styles["signup-button"]} onClick={() => this.setState({ interface: 0, signInError: false, email: "", firstName: "" })}>Cancel</button>
                            <button className={styles["next-button"]} onClick={this.submitPassword}>Sign In</button>
                        </div>
                    </div>
                )

            //Sigining In
            case 2:
                return (
                    <div className={styles["login-container"]}>
                        <div className={styles.title}>
                            Sigining In
                        </div>
                        email: {this.state.email}
                        <hr></hr>
                        password: {this.state.password}
                    </div>
                )

            ////////////////////////////// Sign up interfaces

            //Sign up
            case 3:
                return (
                    <div className={styles["login-container"]}>
                        <div className={styles.title}>
                            Registration
                        </div>
                        <div className={styles.subtitle}>
                            Create your account
                        </div>
                        <div className={styles["signup-inputs-container"]}>
                            <input className={styles["signup-input"]} name="firstName" value={this.state.firstName} onChange={this.onInputchange}/>
                            FIRST NAME

                            <input className={styles["signup-input"]} name="lastName" value={this.state.lastName} onChange={this.onInputchange}/>
                            LAST NAME

                            <input className={styles["signup-input"]} name="email" value={this.state.email} onChange={this.onEmailchange}/>
                            EMAIL
                            
                            <br/>
                            <br/>
                            <div className={styles["input-requirements"]}>
                                <span className={this.state.isEmailValid ? styles.green : styles.red }>
                                    Must be a valid email
                                </span>
                            </div>

                            <input className={styles["signup-input"]} name="number" value={this.state.number} onChange={this.onNumberChange}/>
                            PHONE NUMBER

                            <input className={styles["signup-input"]} name="address" value={this.state.address} onChange={this.onInputchange}/>
                            STREET ADDRESS 
                            <br/>
                            <br/>
                            <button>
                                Why do you need my address?
                            </button>

                            <input className={styles["signup-input"]} name="city" value={this.state.city} onChange={this.onInputchange}/>
                            CITY

                            <input className={styles["signup-input"]} name="state" value={this.state.state} onChange={this.onInputchange}/>
                            STATE/PROVINCE

                            <input className={styles["signup-input"]} type="number" name="zipcode" value={this.state.zipcode} onChange={this.onZipcodechange}/>
                            ZIPCODE

                            <input className={styles["signup-input"]} name="country" value={this.state.country} onChange={this.onInputchange}/>
                            COUNTRY

                            <input className={styles["signup-input"]} type="password" maxLength="50" name="password" value={this.state.password} onChange={this.onPasswordchange}/>
                            PASSWORD

                            <br/>
                            <br/>
                            <div className={styles["input-requirements"]}>
                                <span className={this.state.isPasswordLowercase ? styles.green : styles.red }>
                                    Atleast 1 lower case letter
                                </span> <br/>
                                <span className={this.state.isPasswordUppercase ? styles.green : styles.red }>
                                    Atleast 1 upper case letter 
                                </span> <br/>
                                <span className={this.state.isPasswordNumber ? styles.green : styles.red }>
                                    Atleast 1 number
                                </span> <br/>
                                <span className={this.state.isPasswordSpecial ? styles.green : styles.red }>
                                    Atleast 1 special character
                                </span> <br/>
                                <span className={this.state.isPasswordLong ? styles.green : styles.red }>
                                    Atleast 8 characters
                                </span> <br/>
                            </div>

                            <input className={styles["signup-input"]} type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.onConfirmPasswordchange}/>
                            CONFIRM PASSWORD

                            <br/>
                            <br/>
                            <div className={styles["input-requirements"]}>
                                <span className={this.state.isPasswordConfirmed ? styles.green : styles.red }>
                                        Passwords must match
                                </span>
                            </div>

                        </div>
                        <div className={styles["buttons-container"]}>
                            <button className={styles["signup-button"]} onClick={() => this.setState({ interface: 0, email: "" })}>Cancel</button>
                            <button className={styles["next-button"]} onClick={this.submitForm}>Submit</button>
                        </div>
                    </div>
                )

            //Verification
            case 4:
                return (
                    <div className={styles["login-container"]}>
                        <div className={styles.title}>
                            Creating Account!
                            <hr/>
                            {this.state.firstName}
                            <hr/>
                            {this.state.lastName}
                            <hr/>
                            {this.state.email}
                            <hr/>
                            {this.state.address}
                            <hr/>
                            {this.state.password}
                        </div>
                    </div>
                )
        }
    }
}

export default Login;