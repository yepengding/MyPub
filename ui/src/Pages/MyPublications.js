import {Columns, Heading, Section,} from 'react-bulma-components';

import Hero from '../Components/Hero';
import PublicationList from '../Components/PublicationList';

import {Link} from "react-router-dom";

const MyPublications = ({contract, accountAddress}) => {

    return (
        <Section>
            <Hero/>
            <Heading size={5} renderAs="h1">My Publications</Heading>
            <Columns>
                {contract && accountAddress &&
                <PublicationList contract={contract} accountAddress={accountAddress}/>}
            </Columns>
            <p>Go <Link to="/mine/publish">here</Link> to publish your work :)</p>
        </Section>
    );
};

export default MyPublications;
