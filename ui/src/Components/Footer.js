import {Container, Content, Footer as BulmaFooter} from 'react-bulma-components';

const Footer = () => {
    return (
        <BulmaFooter>
            <Container>
                <Content style={{textAlign: 'center'}}>
                    <p>
                        Created by <strong><a href="https://yepengding.github.io/" target="_blank" rel="noreferrer">Yepeng Ding</a></strong>
                    </p>
                </Content>
            </Container>
        </BulmaFooter>
    );
};

export default Footer;
