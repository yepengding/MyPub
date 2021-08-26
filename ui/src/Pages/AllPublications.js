import {Columns, Heading, Section,} from 'react-bulma-components';

import Hero from '../Components/Hero';
import PublicationList from '../Components/PublicationList';

import {Link} from "react-router-dom";

const AllPublications = ({contract, ipfsGateway}) => {
    return (
        <Section>
            <Hero/>
            <Heading size={5} renderAs="h1">All Publications</Heading>
            <Columns>
                {contract && <PublicationList contract={contract} ipfsGateway={ipfsGateway}/>}
            </Columns>
            <p>Go <Link to="/mine/publish">here</Link> to publish your work :)</p>
        </Section>
    );
};

export default AllPublications;
