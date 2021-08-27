import {Box, Button, Heading, Panel, Section} from 'react-bulma-components';

import Hero from '../Components/Hero';
import React, {useCallback, useEffect, useState} from "react";

import {connect} from "react-redux";
import {formatEther} from "ethers/utils";
import {Link} from "react-router-dom";
import {parseUnits} from "ethers/lib/utils";
import {toast, ToastContainer} from "react-toastify";

const {Block} = Panel;

const MyBalance = ({contract, currentAccountAddress}) => {

    const [balance, setBalance] = useState("0.0");

    const withdraw = () => {
        try {
            const amount = parseUnits(balance);
            contract.withdrawAmount(amount).then(r => {
                toast.success(`Successfully withdraw ${balance} ETH`);
                setBalance("0.0");
            })
        } catch (err) {
            console.error(err);
            toast.error("Failed to withdraw.");
        }
    }

    const getBalance = useCallback(async () => {
        const data = await contract.getBalance();
        setBalance(formatEther(data));
    }, [contract]);

    useEffect(() => {
        if (!currentAccountAddress) {
            return
        }
        try {
            getBalance();
        } catch (err) {
            setBalance("0.0");
            console.error(err)
        }

    }, [currentAccountAddress, getBalance]);

    return (
        <Section>
            <Hero/>
            <Heading size={5} renderAs="h1">My Balance</Heading>
            <Box>
                <Heading renderAs="h3" align="center">
                    {balance} ETH
                </Heading>

            </Box>

            <Block>
                <Button fullwidth color="warning" onClick={withdraw}>
                    Withdraw
                </Button>
            </Block>


            <p>Publish your work <Link to="/mine/publish">here</Link> to earn more :)</p>
            <ToastContainer/>
        </Section>
    )
};

const mapStateToProps = (state) => {
    return {
        currentAccountAddress: state.account.address,
    };
};


export default connect(mapStateToProps)(MyBalance);
