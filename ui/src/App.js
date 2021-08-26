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

import {ethereumConfig, ipfsConfig} from "./config";

const App = () => {

    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);
    const [iface, setIface] = useState(null);
    const [accountAddress, setAccountAddress] = useState(null);

    const initWallet = async () => {
        await window.ethereum.request({method: 'eth_requestAccounts'});
    }

    useEffect(() => {
        console.log("Welcome to use MyPub.");
        initWallet().then(() => {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            setProvider(provider);
            setContract(new ethers.Contract(ethereumConfig.publicationAddress, ethereumConfig.publicationAbi, signer));
            setIface(new ethers.utils.Interface(ethereumConfig.publicationAbi));
            signer.getAddress().then((address => {
                setAccountAddress(address);
            }));
        });
    }, []);

    return (
        <Container>
            <Switch>
                <Route path="/" exact>
                    <Navigation/>
                    <Home contract={contract} ipfsGateway={ipfsConfig.gateway}/>
                    <Footer/>
                </Route>
                <Route path="/mine/publish">
                    <Navigation/>
                    <Publish contract={contract} ipfsGateway={ipfsConfig.gateway}/>
                    <Footer/>
                </Route>
                <Route path="/mine/publications">
                    <Navigation/>
                    <MyPublications provider={provider} contract={contract} iface={iface}
                                    ipfsGateway={ipfsConfig.gateway}
                                    accountAddress={accountAddress}/>
                    <Footer/>
                </Route>
                <Route path="/about">
                    <Navigation/>
                    <About/>
                    <Footer/>
                </Route>
                <Route path="/explore">
                    <Navigation/>
                    <AllPublications contract={contract} ipfsGateway={ipfsConfig.gateway}/>
                    <Footer/>
                </Route>
            </Switch>
        </Container>
    );
}

export default App;
