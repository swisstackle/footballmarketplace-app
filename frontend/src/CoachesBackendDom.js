import React, {useEffect, useState} from "react";
import {Card, Col, Container, Row, Stack} from "react-bootstrap";
import App, {admitService, getServiceRequests, registerCoach} from "./App";
const CoachesBackendDom = (props) => {

    const [isCoach, setIsCoach] = useState();

    useEffect(() => {

        async function load() {

            const coach = await props.contract.methods.isCoachView(props.account).call();
            setIsCoach(coach);

        }

        load();
    }, []);
    return (<CoachesBackendDomInternal isCoach={isCoach} contract={props.contract} account={props.account}/>);
}
const CoachesBackendDomInternal = (props) => {
    const [listItems, setListItems] = useState();
    const [isChairperson, setIsChairperson] = useState();
    useEffect(() => {
        async function load() {
            const _requests = await getServiceRequests();

            const listItems = _requests.map((service) =>
                <li>{service['service_name'] + ' ' + service['service_description'] + ': '} {<a href={"#"}
                                                                                                onClick={() => admitService(service['address'], service['service_name'], service['service_description'], service['price'])}
                                                                                                className={"btn btn-primary"}>Admit</a>}</li>
            );
            setListItems(listItems);
            const isChair = await props.contract.methods.isChairperson(props.account).call();
            setIsChairperson(isChair);
        }

        load();
    }, []);

    const isCoach = props.isCoach;
    if (isCoach) {
        return (<Stack className="align-items-center">
            <h3 className="display-3">Admit Services</h3>
            <ul>{listItems}</ul>
        </Stack>);
    } else {
        if (isChairperson) {
            return (<Container className="px-5 my-5">
                <Row className="justify-content-center">

                    <Col className="col-lg-8">
                        <Card className="border-0 rounded-3 shadow-lg p-5">

                            <div className="card-body p-4">
                                <center>

                                    <div className="h1 fw-light">Register Coach</div>
                                    <p className="mb-4 text-muted">You don't need a password because blockchain
                                        technology takes care of verifying.</p>

                                </center>
                            </div>

                            <form className="form-floating">
                                <center>

                                    <label htmlFor={"cname"} className={"mb-2"}>Username</label>
                                    <input className={"form-control mb-2"} id={"cname"} name={"cname"}
                                           placeholder="Username"
                                    />
                                    <label htmlFor={"caddress"} className={"mb-2"}>Address of Coach</label>
                                    <input className={"form-control mb-2"} id={"caddress"} name={"caddress"}
                                           placeholder="Address of Coach"
                                    />

                                </center>

                                <div className="d-grid">
                                    <a href={"#"} onClick={() => registerCoach(props.contract, props.account)}
                                       className={"btn btn-primary btn-lg"}>Register</a>
                                </div>

                            </form>
                        </Card>

                    </Col>

                </Row></Container>);
        } else {
            return ("You are neither a coach or a chairperson. ");
        }

    }

}
export default CoachesBackendDom;