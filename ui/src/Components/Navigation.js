import {Navbar} from 'react-bulma-components';
import styled from 'styled-components';

import {Link} from "react-router-dom";

const Logo = styled.section`
  font-size: 1.5em;
`;

const StyledLink = styled(Link)`
  color: #4a4a4a;
`;

const Navigation = () => {
    return (
        <Navbar
            active={true}
            transparent={true}
        >
            <Navbar.Brand>
                <Navbar.Item renderAs="span">
                    <Link to="/">
                        <Logo>
                            MyPub
                        </Logo>
                    </Link>
                </Navbar.Item>
                <Navbar.Burger/>
            </Navbar.Brand>
            <Navbar.Menu>
                <Navbar.Container>
                    <Navbar.Item renderAs="span">
                        <StyledLink to="/explore">
                            Explore
                        </StyledLink>
                    </Navbar.Item>

                    <Navbar.Item dropdown hoverable href="#">
                        <Navbar.Link arrowless={false}>
                            Mine
                        </Navbar.Link>
                        <Navbar.Dropdown>
                            <Navbar.Item renderAs="span">
                                <StyledLink to="/mine/publish">
                                    Publish
                                </StyledLink>
                            </Navbar.Item>
                            <Navbar.Item renderAs="span">
                                <StyledLink to="/mine/publications">
                                    Publications
                                </StyledLink>
                            </Navbar.Item>
                            <Navbar.Item renderAs="span">
                                <StyledLink to="/mine/balance">
                                    Balance
                                </StyledLink>
                            </Navbar.Item>
                        </Navbar.Dropdown>
                    </Navbar.Item>


                </Navbar.Container>
                <Navbar.Container position="end">
                    <Navbar.Item renderAs="span">
                        <StyledLink to="/about">
                            About
                        </StyledLink>
                    </Navbar.Item>
                </Navbar.Container>
            </Navbar.Menu>
        </Navbar>
    );
};

export default Navigation;
