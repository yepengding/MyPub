import {Heading, Section,} from 'react-bulma-components';

import Hero from '../Components/Hero';

const About = () => {

    return (
        <Section>
            <Hero/>
            <Heading size={5} renderAs="h1">About</Heading>
            <p>
                Created by <strong><a href="https://yepengding.github.io/" target="_blank" rel="noreferrer">Yepeng
                Ding</a></strong> @ <strong><a href="https://www.gmo.jp" target="_blank"
                                               rel="noreferrer">GMO Internet, Inc.</a></strong>
            </p>
        </Section>
    )
};

export default About;
