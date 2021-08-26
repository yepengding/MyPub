import {Columns, Heading, Section,} from 'react-bulma-components';

import Hero from '../Components/Hero';
import PublicationList from '../Components/PublicationList';

import {Link} from "react-router-dom";

const MyPublications = ({provider, contract, iface, ipfsGateway, accountAddress}) => {

    return (
        <Section>
            <Hero/>
            <Heading size={5} renderAs="h1">My Publications</Heading>
            <Columns>
                {provider && contract && iface && accountAddress &&
                <PublicationList provider={provider} contract={contract} iface={iface} ipfsGateway={ipfsGateway} accountAddress={accountAddress}/>}
            </Columns>
            <p>Go <Link to="/mine/publish">here</Link> to publish your work :)</p>
        </Section>
    );
};

export default MyPublications;
