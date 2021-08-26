import {Container, Heading, Hero} from 'react-bulma-components';
import styled from 'styled-components';

const StyledHero = styled(Hero)`
  margin-bottom: 1rem
`;


const Welcome = () => {
    return (
        <StyledHero color="info" gradient>
            <Hero.Body>
                <Container>
                    <Heading>
                        MyPub
                    </Heading>
                    <Heading subtitle size={5}>
                        A Decentralized Privacy-Preserving Publishing Platform
                    </Heading>
                </Container>
            </Hero.Body>
        </StyledHero>
    );
};

export default Welcome;
