import {Container, Heading, Section} from 'react-bulma-components';

import Hero from '../Components/Hero';
import PublicationList from '../Components/PublicationList';

import {Link} from "react-router-dom";

const AllPublications = ({contract, accountAddress}) => {
    return (
        <Section>
            <Hero/>
            <Heading size={5} renderAs="h1">All Publications</Heading>
            <Container>
                {contract && accountAddress && <PublicationList contract={contract}/>}
            </Container>
            <p>Go <Link to="/mine/publish">here</Link> to publish your work :)</p>
        </Section>
    );
};

export default AllPublications;
