import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiSearch, FiUser, FiShoppingCart } from 'react-icons/fi';
import Icon from '../../common/Icon'; // assuming this wraps react-icons nicely
import { useCart } from '../../../context/CartContext';

const HeaderWrapper = styled.header`
  width: 100%;
  background: var(--background-color, #fff);
  border-bottom: 1px solid var(--border-color, #ccc);
`;

const TopBar = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 1.5rem 2rem;
  max-width: var(--max-width, 1200px);
  margin: 0 auto;
  gap: 2rem;
`;

const LeftNav = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const Logo = styled(Link)`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color, #000);
  letter-spacing: 3px;
  text-transform: uppercase;
  font-family: 'Times New Roman', serif;
  text-decoration: none;
  text-align: center;

  &:hover {
    color: var(--racing-green, #3CB371);
  }
`;

const RightNav = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  justify-content: flex-end;
`;

const NavLink = styled(Link)`
  text-transform: uppercase;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 1px;
  color: var(--text-color, #333);
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: var(--racing-green, #3CB371);
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color, #ccc);
  border-radius: 4px;
  width: 300px;

  @media (max-width: 768px) {
    width: 100%;
    max-width: none;
  }

  input {
    border: none;
    width: 100%;
    padding: 0;
    font-size: 0.9rem;

    &:focus {
      outline: none;
    }
  }
`;

const IconButton = styled(Link)`
  position: relative;
  color: var(--primary-color, #000);
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CartCount = styled.span`
  position: absolute;
  top: -6px;
  right: -6px;
  background: var(--racing-green, #3CB371);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Navigation = styled.nav`
  border-top: 1px solid var(--border-color, #ccc);
  padding: 1rem 0;
  background: var(--background-color, #fff);
`;

const NavList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  list-style: none;
  max-width: var(--max-width, 1200px);
  margin: 0 auto;
  padding: 0.5rem 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 1rem;
    padding: 0.5rem;
  }
`;

const NavItem = styled.li`
  a {
    text-transform: uppercase;
    font-size: 0.8125rem;
    font-weight: 500;
    letter-spacing: 1px;
    color: var(--text-color, #333);
    text-decoration: none;
    transition: color 0.2s ease;
    white-space: nowrap;

    &:hover {
      color: var(--racing-green, #3CB371);
    }
  }
`;

const Header: React.FC = () => {
  const { state: { itemCount } } = useCart();

  return (
    <HeaderWrapper>
      <TopBar>
        <LeftNav>
          <NavLink to="/">HOME</NavLink>
          <NavLink to="/about">ABOUT US</NavLink>
        </LeftNav>

        <Logo to="/">AFFERA</Logo>

        <RightNav>
          <SearchBar>
            <Icon icon={FiSearch} />
            <input type="text" placeholder="Search tools and supplies..." />
          </SearchBar>
          
          <NavLink to="/contact">CONTACT</NavLink>
          
          <IconButton to="/account">
            <Icon icon={FiUser} />
          </IconButton>
          
          <IconButton to="/cart">
            <Icon icon={FiShoppingCart} />
            {itemCount > 0 && <CartCount>{itemCount}</CartCount>}
          </IconButton>
        </RightNav>
      </TopBar>

      <Navigation>
        <NavList>
          <NavItem><Link to="/bathroom-plumbing">BATHROOM & PLUMBING</Link></NavItem>
          <NavItem><Link to="/landscaping">LANDSCAPING</Link></NavItem>
          <NavItem><Link to="/storage">STORAGE & SHELVING</Link></NavItem>
          <NavItem><Link to="/lighting">LIGHTING</Link></NavItem>
          <NavItem><Link to="/security">DOOR LOCKS & SECURITY</Link></NavItem>
          <NavItem><Link to="/screws">SCREWS & FIXINGS</Link></NavItem>
        </NavList>
      </Navigation>
    </HeaderWrapper>
  );
};

export default Header;
