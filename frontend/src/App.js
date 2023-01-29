import React, {Component, useEffect, useState,createContext } from 'react';
import {Routes, Route} from 'react-router'
import * as $ from 'jquery';
import Web3 from 'web3';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer';
import Video from "./Video";
import Store from "./Store";
import RequestRegisterService from "./RequestRegisterService";
import CoachesBackendDom from './CoachesBackendDom';
import RegisterFormDom from './Register';
import WalletDom from "./WalletDom";
import MyServicesDom from "./MyServices";
import {
    Navbar,
    Nav,
    Container,
    NavDropdown,
    Form,
    FormControl,
    Button,
    Row,
    Col,
    Stack,
    PageHeader,
    Card
} from 'react-bootstrap';
import {Link} from "react-router-dom";

var abi = JSON.parse('[\n' +
    '\t{\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "uint256",\n' +
    '\t\t\t\t"name": "initialSupply",\n' +
    '\t\t\t\t"type": "uint256"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"stateMutability": "payable",\n' +
    '\t\t"type": "constructor"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"anonymous": false,\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"indexed": true,\n' +
    '\t\t\t\t"internalType": "address",\n' +
    '\t\t\t\t"name": "owner",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t},\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"indexed": true,\n' +
    '\t\t\t\t"internalType": "address",\n' +
    '\t\t\t\t"name": "spender",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t},\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"indexed": false,\n' +
    '\t\t\t\t"internalType": "uint256",\n' +
    '\t\t\t\t"name": "value",\n' +
    '\t\t\t\t"type": "uint256"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "Approval",\n' +
    '\t\t"type": "event"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"anonymous": false,\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"indexed": true,\n' +
    '\t\t\t\t"internalType": "address",\n' +
    '\t\t\t\t"name": "from",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t},\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"indexed": true,\n' +
    '\t\t\t\t"internalType": "address",\n' +
    '\t\t\t\t"name": "to",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t},\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"indexed": false,\n' +
    '\t\t\t\t"internalType": "uint256",\n' +
    '\t\t\t\t"name": "value",\n' +
    '\t\t\t\t"type": "uint256"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "Transfer",\n' +
    '\t\t"type": "event"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "uint256",\n' +
    '\t\t\t\t"name": "amount",\n' +
    '\t\t\t\t"type": "uint256"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "airdrop",\n' +
    '\t\t"outputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "bool",\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "bool"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"stateMutability": "nonpayable",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "address",\n' +
    '\t\t\t\t"name": "to",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t},\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "uint256",\n' +
    '\t\t\t\t"name": "amount",\n' +
    '\t\t\t\t"type": "uint256"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "airdrop2",\n' +
    '\t\t"outputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "bool",\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "bool"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"stateMutability": "nonpayable",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "address",\n' +
    '\t\t\t\t"name": "owner",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t},\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "address",\n' +
    '\t\t\t\t"name": "spender",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "allowance",\n' +
    '\t\t"outputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "uint256",\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "uint256"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"stateMutability": "view",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "address",\n' +
    '\t\t\t\t"name": "spender",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t},\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "uint256",\n' +
    '\t\t\t\t"name": "amount",\n' +
    '\t\t\t\t"type": "uint256"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "approve",\n' +
    '\t\t"outputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "bool",\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "bool"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"stateMutability": "nonpayable",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "address",\n' +
    '\t\t\t\t"name": "account",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "balanceOf",\n' +
    '\t\t"outputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "uint256",\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "uint256"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"stateMutability": "view",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [],\n' +
    '\t\t"name": "decimals",\n' +
    '\t\t"outputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "uint8",\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "uint8"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"stateMutability": "view",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "address",\n' +
    '\t\t\t\t"name": "spender",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t},\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "uint256",\n' +
    '\t\t\t\t"name": "subtractedValue",\n' +
    '\t\t\t\t"type": "uint256"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "decreaseAllowance",\n' +
    '\t\t"outputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "bool",\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "bool"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"stateMutability": "nonpayable",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "address",\n' +
    '\t\t\t\t"name": "from",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "getBalance",\n' +
    '\t\t"outputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "uint256",\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "uint256"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"stateMutability": "view",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [],\n' +
    '\t\t"name": "getChairperson",\n' +
    '\t\t"outputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "address",\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"stateMutability": "view",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [],\n' +
    '\t\t"name": "getTokenAddress",\n' +
    '\t\t"outputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "address",\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"stateMutability": "view",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "address",\n' +
    '\t\t\t\t"name": "spender",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t},\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "uint256",\n' +
    '\t\t\t\t"name": "addedValue",\n' +
    '\t\t\t\t"type": "uint256"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "increaseAllowance",\n' +
    '\t\t"outputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "bool",\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "bool"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"stateMutability": "nonpayable",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "address",\n' +
    '\t\t\t\t"name": "a",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "isChairperson",\n' +
    '\t\t"outputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "bool",\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "bool"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"stateMutability": "view",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "address",\n' +
    '\t\t\t\t"name": "a",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "isCoachView",\n' +
    '\t\t"outputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "bool",\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "bool"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"stateMutability": "view",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "address",\n' +
    '\t\t\t\t"name": "a",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "isRegistered",\n' +
    '\t\t"outputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "bool",\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "bool"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"stateMutability": "view",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [],\n' +
    '\t\t"name": "name",\n' +
    '\t\t"outputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "string",\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "string"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"stateMutability": "view",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [],\n' +
    '\t\t"name": "register",\n' +
    '\t\t"outputs": [],\n' +
    '\t\t"stateMutability": "payable",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "address payable",\n' +
    '\t\t\t\t"name": "toRegister",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "registerCoach",\n' +
    '\t\t"outputs": [],\n' +
    '\t\t"stateMutability": "payable",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [],\n' +
    '\t\t"name": "register_service",\n' +
    '\t\t"outputs": [],\n' +
    '\t\t"stateMutability": "nonpayable",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [],\n' +
    '\t\t"name": "submit_service",\n' +
    '\t\t"outputs": [],\n' +
    '\t\t"stateMutability": "nonpayable",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [],\n' +
    '\t\t"name": "symbol",\n' +
    '\t\t"outputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "string",\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "string"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"stateMutability": "view",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [],\n' +
    '\t\t"name": "totalSupply",\n' +
    '\t\t"outputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "uint256",\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "uint256"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"stateMutability": "view",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "address",\n' +
    '\t\t\t\t"name": "to",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t},\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "uint256",\n' +
    '\t\t\t\t"name": "amount",\n' +
    '\t\t\t\t"type": "uint256"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "transfer",\n' +
    '\t\t"outputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "bool",\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "bool"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"stateMutability": "nonpayable",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "address",\n' +
    '\t\t\t\t"name": "from",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t},\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "address",\n' +
    '\t\t\t\t"name": "to",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t},\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "uint256",\n' +
    '\t\t\t\t"name": "amount",\n' +
    '\t\t\t\t"type": "uint256"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "transferFrom",\n' +
    '\t\t"outputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"internalType": "bool",\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "bool"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"stateMutability": "nonpayable",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [],\n' +
    '\t\t"name": "unRegister",\n' +
    '\t\t"outputs": [],\n' +
    '\t\t"stateMutability": "payable",\n' +
    '\t\t"type": "function"\n' +
    '\t}\n' +
    ']'
);


function App() {
    const [contract, setContract] = useState();
    const [account, setAccount] = useState();
    const [web3Obj, setWeb3Obj] = useState();


    useEffect(() => {

        async function load() {
            const web3 = new Web3(Web3.givenProvider || 'http://http://localhost:7545');
            setWeb3Obj(web3);
            const accounts = await web3.eth.requestAccounts();
            setAccount(accounts[0]);
            $.get("getcontractaddress")
                .done(function (data) {


                    const _contract = new web3.eth.Contract(abi, data);
                    _contract.address = data;
                    setContract(_contract);


                });


        }

        load();
    }, [])

    return (
        <Stack className="vw-100 vh-100">
            <NavDom contract={contract}/>

            <Routes>
                <Route path='register' element={<RegisterFormDom contract={contract} account={account}/>}/>
                <Route path='wallet' element={<WalletDom contract={contract} account={account} web3Obj={web3Obj}/>}/>
                <Route path='myservices'
                       element={<MyServicesDom contract={contract} account={account} web3Obj={web3Obj}/>}/>
                <Route path='coaches'
                       element={<CoachesBackendDom contract={contract} account={account} web3Obj={web3Obj}/>}/>
                <Route path='store' element={<Store contract={contract} account={account} web3Obj={web3Obj}/>}/>
                <Route path='createservice'
                       element={<RequestRegisterService contract={contract} account={account} web3Obj={web3Obj}/>}/>
                <Route path='home' element={<HomeDom/>}/>
                <Route path='' element={<HomeDom/>}/>
            </Routes>
            <Footer/>
        </Stack>
    );

}


const HomeDom = () => {
    return (
        <Video/>
    );
}
const NavDom = (props) => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/home">Bulls Marketplace</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">

                        <Nav.Link as={Link} to="/wallet">Wallet</Nav.Link>
                        <NavDropdown title="Services" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/myservices">My Services</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/createservice">Create a Service</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to="/store">Store</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link as={Link} to="/register">Register</Nav.Link>
                        <Nav.Link as={Link} to="/coaches">Backend</Nav.Link>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}




export async function getServices(account) {
    let services = await $.get("getAdmittedServices?address=" + account);

    return services;
}

export async function getServiceRequests() {
    let services = await $.get("getServiceRequests");

    return services;
}

export async function admitService(address, name, description, price) {
    await $.get('admitservice?address=' + address + '&name=' + name + '&description=' + description + '&price=' + price);
}

export function registerPlayer(contract, account) {
    console.log(contract.address);
    let username = document.getElementById('username').value;
    username = encodeURIComponent(username);
    console.log(username);
    if(username.length > 0) {
        contract.methods.register().send({from: account}).then(function (receipt) {
            if (receipt) {
                alert('Executing with ' + document.getElementById('username').value + ' and ' + account);
                $.get('http://localhost:3300/registeruser?username=' + username + '&address=' + account, {async: false});
            }
        });
    }
}

export function registerCoach(contract, account) {
    let coachName = document.getElementById('cname').value;
    let caddress = document.getElementById('caddress').value;
    coachName = encodeURIComponent(coachName);
    //TODO: Check for address being in the correct format. Issue #33: https://github.com/swisstackle/football_marketplace/issues/33
    if(coachName.length > 0 && caddress.length > 0){
        contract.methods.registerCoach(caddress).send({from: account}).then(function (receipt) {
            if (receipt) {
                $.get('http://localhost:3300/registercoach?username=' + coachName + '&address=' + caddress, {async:false});
            }
        });
    }
}

export function requestRegisterService(contract, account) {
    let servicename = document.getElementById('servicename').value;
    let description = document.getElementById('servicedescription').value;
    let price = document.getElementById('price').value;
    servicename = encodeURIComponent(servicename);
    description = encodeURIComponent(description);
    price = encodeURIComponent(price);
    if(servicename.length > 0 && description.length > 0 && parseInt(price) > 0) {
        contract.methods.isRegistered(account).call().then(function (isReg) {
            if (!isReg) {
                alert("You are not registred, you can't register a service.");
                return;
            }
            $.get('http://localhost:3300/requestRegisterService?name=' + servicename + '&description=' + description + '&address=' + account + '&price=' + price, {async: false});

            $('#servicename').val('');
            $('#servicedescription').val('');
            $('#price').val('');
            alert("Successfully created service.")
            //check if get request succesful
        });
    }
}



export async function getBalance(_contract, _account, _web3Obj) {
    let contract = _contract;
    let account = _account;
    //result has to be converted to Btt. The decimal used here is 18. Has to be changed if the decimal changes
    //TODO: instead of using 18, request the decimal from the smartcontract to make it more dynamic. However, we have no reason to change the decimal, so we will use 18 statically for now.
    //return await _web3Obj.eth.getBalance(account).then(result => result*Math.pow(10,-18));
    return await contract.methods.getBalance(account).call();
}

export function buy_service(contract, account, web3Obj, addressTo, servicename, price) {
    alert("The price is " + price);
    contract.methods.transfer(addressTo, web3Obj.utils.toWei(price, "ether")).send({from: account}
    ).then(async function (receipt) {

        if (receipt) {
            await $.get('http://localhost:3300/buyservice?servicename=' + servicename + '&address=' + account)

        } else {
        }

    });
}

export async function get_allservices() {
    let services = await $.get("getallservices");

    return services;
}


export default App;


