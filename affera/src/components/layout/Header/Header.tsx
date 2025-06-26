import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiSearch, FiUser, FiShoppingCart } from 'react-icons/fi';
import Icon from '../../common/Icon';
import { useCart } from '../../../context/CartContext';

const HeaderWrapper = styled.header`
  width: 100%;
  background: var(--background-color);
  border-bottom: 1px solid var(--border-color);
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem var(--container-padding, 2rem);
  max-width: var(--max-width);
  margin: 0 auto;
  position: relative;

  @media (max-width: 1024px) {
    justify-content: space-between;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Logo = styled(Link)`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
  letter-spacing: 3px;
  text-transform: uppercase;
  font-family: 'Times New Roman', serif;
  text-decoration: none;
  text-align: center;
  
  &:hover {
    color: var(--racing-green);
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  width: 300px;
  position: absolute;
  right: 120px;

  @media (max-width: 1024px) {
    position: static;
    width: 250px;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 400px;
  }

  input {
    border: none;
    width: 100%;
    padding: 0;

    &:focus {
      outline: none;
    }
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  position: absolute;
  right: 0;

  @media (max-width: 1024px) {
    position: static;
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const IconButton = styled(Link)`
  position: relative;
  color: var(--primary-color);
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--racing-green);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  min-width: 20px;
  text-align: center;
`;

const Navigation = styled.nav`
  border-top: 1px solid var(--border-color);
  padding: 1rem 0;
  background: var(--background-color);
`;

const NavList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  list-style: none;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0.5rem var(--container-padding, 2rem);
`;

const NavItem = styled.li`
  a {
    text-transform: uppercase;
    font-size: 0.8125rem;
    font-weight: 500;
    letter-spacing: 1px;
    color: var(--text-color);
    transition: color 0.2s ease;
    text-decoration: none;
    position: relative;

    &:after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--racing-green);
      transition: width 0.2s ease;
    }

    &:hover {
      color: var(--racing-green);
      
      &:after {
        width: 100%;
      }
    }
  }
`;

const Header: React.FC = () => {
  const { state: { itemCount } } = useCart();

  return (
    <HeaderWrapper>
      <TopBar>
        <Logo to="/">AFFERA</Logo>
        
        <SearchBar>
          <Icon icon={FiSearch} />
          <input type="text" placeholder="Search tools and supplies..." />
        </SearchBar>
        
        <Actions>
          <IconButton to="/account">
            <Icon icon={FiUser} />
          </IconButton>
          <IconButton to="/cart">
            <Icon icon={FiShoppingCart} />
            {itemCount > 0 && <CartCount>{itemCount}</CartCount>}
          </IconButton>
        </Actions>
      </TopBar>

      <Navigation>
        <NavList>
          <NavItem>
            <Link to="/">HOME</Link>
          </NavItem>
          <NavItem>
            <Link to="/about">ABOUT US</Link>
          </NavItem>
          <NavItem>
            <Link to="/bathroom-plumbing">BATHROOM & PLUMBING</Link>
          </NavItem>
          <NavItem>
            <Link to="/landscaping">LANDSCAPING</Link>
          </NavItem>
          <NavItem>
            <Link to="/storage">STORAGE & SHELVING</Link>
          </NavItem>
          <NavItem>
            <Link to="/lighting">LIGHTING</Link>
          </NavItem>
          <NavItem>
            <Link to="/security">DOOR LOCKS & SECURITY</Link>
          </NavItem>
          <NavItem>
            <Link to="/screws">SCREWS & FIXINGS</Link>
          </NavItem>
          <NavItem>
            <Link to="/contact">CONTACT</Link>
          </NavItem>
        </NavList>
      </Navigation>
    </HeaderWrapper>
  );
};

export default Header;
