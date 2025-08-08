import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FiSearch, FiUser, FiShoppingCart } from "react-icons/fi";
import Icon from "../../common/Icon";
import { useCart } from "../../../context/CartContext";

const HeaderWrapper = styled.header`
  width: 100%;
  background: var(--background-color, #fff);
  border-bottom: 1px solid var(--border-color, #ccc);
`;

const TopBarContainer = styled.div`
  width: 100%;
  padding: 0 var(--padding-lg);

  @media (min-width: 1440px) {
    padding: 0 var(--padding-xl);
  }

  @media (min-width: 1920px) {
    padding: 0 var(--padding-xxl);
  }
`;

const TopBar = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 1.5rem 0;
  max-width: var(--max-width);
  margin: 0 auto;
  gap: clamp(1rem, 3vw, 2rem);

  @media (min-width: 1440px) {
    gap: clamp(2rem, 4vw, 3rem);
  }
`;

const LeftNav = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const Logo = styled(Link)`
  font-family: "Cinzel", serif;
  font-weight: 600;
  font-size: 2.5rem;
  color: var(--primary-color, #000);
  letter-spacing: 3px;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;

  &:hover {
    color: var(--racing-green, #3cb371);
  }
`;

const RightNav = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  justify-content: flex-end;
`;

const NavLink = styled(Link)`
  font-family: "Nimbus Sans", sans-serif;
  text-transform: uppercase;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 1px;
  color: var(--text-color, #333);
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: var(--racing-green, #3cb371);
  }
`;

const SearchBar = styled.div`
  font-family: "Noto Sans", sans-serif;
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
    font-family: "Noto Sans", sans-serif;
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
  font-family: "Noto Sans", sans-serif;
  position: relative;
  color: var(--primary-color, #000);
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CartCount = styled.span`
  font-family: "Noto Sans", sans-serif;
  position: absolute;
  top: -6px;
  right: -6px;
  background: var(--racing-green, #3cb371);
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
  background: var(--background-color, #fff);
  padding: 0 var(--padding-lg);

  @media (min-width: 1440px) {
    padding: 0 var(--padding-xl);
  }

  @media (min-width: 1920px) {
    padding: 0 var(--padding-xxl);
  }
`;

const NavList = styled.ul`
  font-family: "Nimbus Sans", serif;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: clamp(1.5rem, 3vw, 3rem);
  list-style: none;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 1rem 0;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 1rem;
    padding: 0.75rem 0;
  }
`;

const NavItem = styled.li`
  a {
    font-family: "Nimbus Sans", serif;
    text-transform: uppercase;
    font-size: 0.8125rem;
    font-weight: 500;
    letter-spacing: 1px;
    color: var(--text-color, #333);
    text-decoration: none;
    transition: color 0.2s ease;
    white-space: nowrap;

    &:hover {
      color: var(--racing-green, #3cb371);
    }
  }
`;

const Header: React.FC = () => {
  const {
    state: { itemCount },
  } = useCart();

  return (
    <HeaderWrapper>
      <TopBarContainer>
        <TopBar>
          <LeftNav>
            <NavLink to="/">HOME</NavLink>
            <NavLink to="/about">ABOUT US</NavLink>
            <NavLink to="/contact">CONTACT</NavLink>
          </LeftNav>

          <Logo to="/">FERONOVA</Logo>

          <RightNav>
            <SearchBar>
              <Icon icon={FiSearch} />
              <input type="text" placeholder="Search tools and supplies..." />
            </SearchBar>
{/** 
            <IconButton to="/login">
              <Icon icon={FiUser} />
              <span style={{ fontSize: "0.8rem", marginLeft: "0.25rem" }}>
                LOGIN
              </span>
            </IconButton>
            <NavLink to="/signup" style={{ fontSize: "0.8rem" }}>
              SIGN UP
            </NavLink>
*/}
            <IconButton to="/cart">
              <Icon icon={FiShoppingCart} />
              {itemCount > 0 && <CartCount>{itemCount}</CartCount>}
            </IconButton>
          </RightNav>
        </TopBar>
      </TopBarContainer>
      <Navigation>
        <NavList>
          <NavItem>
            <Link to="/Bath & Plumbing">BATHROOM & PLUMBING</Link>
          </NavItem>
          <NavItem>
            <Link to="/Landscaping">LANDSCAPING</Link>
          </NavItem>
          <NavItem>
            <Link to="/Storage & Shelving">STORAGE & SHELVING</Link>
          </NavItem>
          <NavItem>
            <Link to="/Lighting">LIGHTING</Link>
          </NavItem>
          <NavItem>
            <Link to="/Doors & Security">DOORS & SECURITY</Link>
          </NavItem>
          <NavItem>
            <Link to="/Screws & Fixings">SCREWS & FIXINGS</Link>
          </NavItem>
        </NavList>
      </Navigation>
    </HeaderWrapper>
  );
};

export default Header;
