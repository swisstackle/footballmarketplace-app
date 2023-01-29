import React, {useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import App, {getBalance} from './App';

const WalletDom = (props) => {
    const _contract = props.contract;
    const _account = props.account;
    const [isRegistered, setIsRegistred] = useState();
    useEffect(() => {

        async function load() {

            const isReg = await _contract.methods.isRegistered(_account).call();
            setIsRegistred(isReg);
        }

        load();
    }, [])


    return (
        <WalletDomInternal registered={isRegistered} contract={props.contract} account={props.account}
                           web3Obj={props.web3Obj}/>
    );
}
const WalletDomInternal = (props) => {

    const [balance, setBalance] = useState();
    useEffect(() => {
        async function load() {
            const balance = await getBalance(props.contract, props.account, props.web3Obj);
            setBalance(balance);
        }

        load();
    }, []);
    if (props.registered) {


        return (<Row>
            <Col>
                <h3 className="sub-header">You have {balance} Btt</h3>
            </Col>

        </Row>);
    } else {
        return ("Not Registered.");
    }
}
export default WalletDom;