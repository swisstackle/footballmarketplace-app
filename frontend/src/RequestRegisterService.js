import React, {useEffect, useState} from "react";
import {Card, Col, Container, Row, Stack} from "react-bootstrap";

import App, {requestRegisterService} from "./App";
import * as $ from "jquery";


const RequestRegisterService = (props) => {
    const contract = props.contract;
    const account = props.account;
    const [isRegistered, setIsRegistred] = useState();
    useEffect(() => {

        async function load() {

            const isReg = await contract.methods.isRegistered(account).call();
            console.log(isReg);
            setIsRegistred(isReg);
        }

        load();
    }, []);


    return (
        <RequestRegisterServiceInternal registered={isRegistered} contract={props.contract} account={props.account}
                                        web3Obj={props.web3Obj}/>
    );
}

const RequestRegisterServiceInternal = (props) => {
    const registered = props.registered;

    useEffect(()=>{
        async function load(){
            $('#successmessage').addClass('d-none');
        }
        load();
    },[])

    if (registered) {
        return (<Container className="px-5 my-5">
            <Row className="justify-content-center">

                <Col className="col-lg-8">
                    <Card className="border-0 rounded-3 shadow-lg p-5">

                        <div className="card-body p-4">
                            <center>

                                <div className="h1 fw-light">Create a Service</div>
                                <p className="mb-4 text-muted">Your service will have to be admitted by your coaches.</p>

                            </center>
                        </div>

                        <form className="form-floating">
                            <center>
                                <label htmlFor={"servicename"} className={"mb-2"}>Servicename</label>
                                <input className={"form-control mb-2"} id={"servicename"} name={"servicename"}
                                       placeholder="Servicename"
                                />
                                <label htmlFor={"servicedescription"} className={"mb-2"}>Servicedescription</label>
                                <input className={"form-control mb-2"} id={"servicedescription"} name={"servicedescription"}
                                       placeholder="Servicedescription"
                                />
                                <label htmlFor={"price"} className={"mb-2"}>Price</label>
                                <input className={"form-control mb-2"} id={"price"} name={"price"}
                                       placeholder="Price"
                                />
                            </center>
                            <div className="d-grid">
                                <a href={"#"} onClick={() => requestRegisterService(props.contract, props.account)}
                                   className={"btn btn-primary btn-lg"}>Register</a>
                            </div>

                        </form>
                    </Card>

                </Col>

            </Row></Container>);
    }else{
        return("Not registered");
    }

}

export default RequestRegisterService;