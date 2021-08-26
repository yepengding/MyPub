import {Button, Columns, Heading, Section,} from 'react-bulma-components';

import Hero from '../Components/Hero';
import PublicationList from '../Components/PublicationList';
import {BigNumber} from "ethers";
import {parseUnits} from "ethers/lib/utils";

const Home = ({contract, ipfsGateway}) => {

    const test = async () => {
        try {
            const amount = parseUnits("0.8");
            const r = await contract.withdrawAmount(amount);
            console.log(r);
        } catch (err) {
            console.error(err)
        }
    }

    const testPay = async () => {
        try {
            const tokenId = BigNumber.from(1).toNumber();
            const amount = parseUnits("6.6");
            const r = await contract.purchase(tokenId, {value: amount});
            console.log(r);
        } catch (err) {
            console.error(err)
        }
    }

    const testOwnerOf = async () => {
        try {
            const tokenId = BigNumber.from(1).toNumber();
            const address = await contract.ownerOf(tokenId);
            console.log(address);
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <Section>
            <Hero/>
            <Heading size={5} renderAs="h1">Latest Publications</Heading>
            <Button onClick={test}>Test</Button>
            <Columns>
                {contract && <PublicationList contract={contract} ipfsGateway={ipfsGateway} limit={3}/>}
            </Columns>
        </Section>
    )
};

export default Home;
