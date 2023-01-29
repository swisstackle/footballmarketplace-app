import React, {useEffect, useState} from "react";
import {Card, Col, Container, Row, Stack} from "react-bootstrap";
import App, {registerPlayer} from './App'
const RegisterFormDom = (props) => {
    const [isRegistered, setIsRegistered] = useState();
    useEffect(() => {

        async function load() {
            console.log(props.contract);
            const isReg = await props.contract.methods.isRegistered(props.account).call();
            setIsRegistered(isReg);
        }

        load();
    }, [])
    if (!isRegistered) {
        return (
            <Container className="px-5 my-5">
                <Row className="justify-content-center">

                    <Col className="col-lg-8">
                        <Card className="border-0 rounded-3 shadow-lg p-5">

                            <div className="card-body p-4">
                                <center>

                                    <div className="h1 fw-light">Register Yourself</div>
                                    <p className="mb-4 text-muted">You don't need a password because blockchain
                                        technology takes care of verifying.</p>

                                </center>
                            </div>

                            <form className="form-floating">
                                <center>

                                    <label htmlFor={"username"} className={"mb-2"}>Username</label>
                                    <input className={"form-control mb-2"} id={"username"} name={"username"}
                                           placeholder="Username"
                                    />

                                </center>

                                <div className="d-grid">
                                    <a href={"#"} onClick={() => registerPlayer(props.contract, props.account)}
                                       className={"btn btn-primary btn-lg"}>Register</a>
                                </div>

                            </form>
                        </Card>

                    </Col>

                </Row></Container>


        );
    } else {
        return (<Stack className="justify-content-center align-items-center">
                <h3 className="display-3">You are already registered.</h3>
            </Stack>

        );
    }

}
export default RegisterFormDom;