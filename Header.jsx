import React from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/system';
import { Typography } from '@mui/material';

const HeaderContainer = styled('header')({
    display: 'flex',
    flexDirection: 'column', // Stack title and nav vertically
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#a28c74',
    color: '#fff',
    width: '100%',
    boxSizing: 'border-box',
    overflowX: 'hidden',
});

const Title = styled(Typography)({
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    textAlign: 'center',
});

const NavBar = styled('nav')({
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginBottom: '1rem', // Space between nav and title
});

const NavList = styled('ul')({
    display: 'flex',
    listStyleType: 'none',
    margin: 0,
    padding: 0,
});

const NavItem = styled('li')({
    margin: '0 1rem',
});

const StyledNavLink = styled(NavLink)({
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    '&:hover': {
        backgroundColor: '#fff',
        color: '#add8e6',
        textDecoration: 'none',
    },
    '&.active': {
        fontWeight: 'bold',
        backgroundColor: '#fff',
        color: '#add8e6',
    },
});

const Logo = styled('img')({
    width: '100px',
    marginBottom: '1rem',
});

const Header = () => {
    return (
        <HeaderContainer>
            <Logo 
                src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/529/9068151529_0ed28cc1-4bfc-488e-a38c-d5a0ff44099b.png?cb=1724879736" 
                alt="Logo"
            />
            <NavBar>
                <NavList>
                    <NavItem><StyledNavLink to="/">Home</StyledNavLink></NavItem>
                    <NavItem><StyledNavLink to="/votacao">Votar</StyledNavLink></NavItem>
                    <NavItem><StyledNavLink to="/placar-parcial">Placar Parcial</StyledNavLink></NavItem>
                    <NavItem><StyledNavLink to="/placar-geral">Placar Geral</StyledNavLink></NavItem>
                </NavList>
            </NavBar>
        </HeaderContainer>
    );
}

export default Header;
