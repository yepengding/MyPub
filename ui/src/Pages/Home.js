import {Container, Heading, Section,} from 'react-bulma-components';

import Hero from '../Components/Hero';
import PublicationList from '../Components/PublicationList';


const Home = ({contract}) => {

    return (
        <Section>
            <Hero/>
            <Heading size={5} renderAs="h1">Latest Publications</Heading>
            {/*<Button onClick={test}>Test</Button>*/}
            <Container>
                {contract && <PublicationList contract={contract} limit={3}/>}
            </Container>
        </Section>
    )
};

export default Home;
