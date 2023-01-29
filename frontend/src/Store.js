import React, {useEffect, useState} from "react";
import {Col, Row, Stack} from "react-bootstrap";

import App, {buy_service, get_allservices} from "./App";


const Store = (props) => {
    const contract = props.contract;
    const account = props.account;
    const [isRegistered, setIsRegistred] = useState();
    useEffect(()=>{

        async function load(){

            const isReg = await contract.methods.isRegistered(account).call();
            console.log(isReg);
            setIsRegistred(isReg);
        }
        load();
    },[]);


    return(
        <StoreInternal registered={isRegistered} contract={props.contract} account={props.account} web3Obj={props.web3Obj}/>
    );
}

const StoreInternal = (props) => {
    const [listItems, setListItems] = useState();
    useEffect(()=>{
        async function load(){
            const services = await get_allservices();
            const listItems = services.map((service) =>
                <li>{service['service_name'] + ' ' + service['service_description'] + ': '} {<a href={"#"} onClick={() => buy_service(props.contract, props.account, props.web3Obj, service['address'], service['service_name'], service['price'])} className={"btn btn-primary"}>Buy</a>}</li>

            );
            setListItems(listItems);
        }
        load();
    },[]);



    if(props.registered){
        return(<Stack className="align-items-center">
            <h3 className="display-3">Buy Services</h3>
            <ul>{listItems}</ul>
        </Stack>);
    }else{
        return("Not registered");
    }


}

export default Store;