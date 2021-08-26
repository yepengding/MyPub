import {Columns, Heading, Section,} from 'react-bulma-components';

import Hero from '../Components/Hero';
import PublicationList from '../Components/PublicationList';

const Home = ({contract, ipfsGateway}) => {

    return (
        <Section>
            <Hero/>
            <Heading size={5} renderAs="h1">Latest Publications</Heading>
            <Columns>
                {contract && <PublicationList contract={contract} ipfsGateway={ipfsGateway} limit={3}/>}
            </Columns>
        </Section>
    )
};

export default Home;
