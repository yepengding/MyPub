import 'react-bulma-components/dist/react-bulma-components.min.css';
import {Container} from 'react-bulma-components';
import {Route, Switch} from "react-router-dom";

import {ethers} from "ethers";

import Home from './Pages/Home';
import AllPublications from './Pages/AllPublications';
import About from './Pages/About';
import Publish from "./Pages/Publish";

import Navigation from './Components/Navigation';
import Footer from './Components/Footer';
import {useEffect, useState} from "react";
import MyPublications from "./Pages/MyPublications";

import {ethereumConfig} from "./config";
import {toast} from "react-toastify";

import {setAddress} from './store/accountSlice'
import {connect} from "react-redux";
import MyBalance from "./Pages/MyBalance";

const App = ({setAddress}) => {

    // const [provider, setProvider] = useState(null);
    // const [iface, setIface] = useState(null);
    const [publicationContract, setPublicationContract] = useState(null);
    const [accountAddress, setAccountAddress] = useState(null);

    const initWallet = async () => {
        await window.ethereum.request({method: 'eth_requestAccounts'});
    }

    useEffect(() => {
        initWallet().then(() => {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            // setProvider(provider);
            // setIface(new ethers.utils.Interface(ethereumConfig.publicationAbi));
            setPublicationContract(new ethers.Contract(ethereumConfig.publicationAddress, ethereumConfig.publicationAbi, signer));
            signer.getAddress().then((address => {
                setAddress(address);
                setAccountAddress(address);
                toast.success(`Hello, ${address}`);
                console.log(`Hello, ${address}. \nWelcome to use MyPub.`);
            }));
        });
    }, [setAddress]);

    return (
        <Container>
            <Switch>
                <Route path="/" exact>
                    <Navigation/>
                    <Home contract={publicationContract}/>
                    <Footer/>
                </Route>
                <Route path="/mine/publish">
                    <Navigation/>
                    <Publish contract={publicationContract}/>
                    <Footer/>
                </Route>
                <Route path="/mine/publications">
                    <Navigation/>
                    <MyPublications contract={publicationContract}
                                    accountAddress={accountAddress}/>
                    <Footer/>
                </Route>
                <Route path="/mine/balance">
                    <Navigation/>
                    <MyBalance contract={publicationContract}/>
                    <Footer/>
                </Route>
                <Route path="/about">
                    <Navigation/>
                    <About/>
                    <Footer/>
                </Route>
                <Route path="/explore">
                    <Navigation/>
                    <AllPublications contract={publicationContract} accountAddress={accountAddress}/>
                    <Footer/>
                </Route>
            </Switch>
        </Container>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAddress: (address) => dispatch(setAddress(address))
    };
};


export default connect(null, mapDispatchToProps)(App);
