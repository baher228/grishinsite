import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  FiSearch,
  // FiUser,
  FiShoppingCart,
  FiMenu,
  FiX,
} from "react-icons/fi";
import Icon from "../../common/Icon";
import { useCart } from "../../../context/CartContext";

const MOBILE_BP = 920; // mobile breakpoint (px)

/* ====== Wrappers ====== */
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

  @media (max-width: ${MOBILE_BP}px) {
    grid-template-columns: auto 1fr auto;
    padding: 1rem 0;
  }
`;

/* ====== Visibility helpers ====== */
const DesktopOnly = styled.div`
  @media (max-width: ${MOBILE_BP}px) {
    display: none !important;
  }
`;

const MobileOnly = styled.div`
  display: none;
  @media (max-width: ${MOBILE_BP}px) {
    display: contents; /* lets children define their own layout */
  }
`;

/* ====== Top Left / Logo / Top Right ====== */
const LeftNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const MenuButton = styled.button`
  border: none;
  background: transparent;
  padding: 0.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--primary-color, #000);
  cursor: pointer;
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

  @media (max-width: ${MOBILE_BP}px) {
    font-size: 1.9rem;
    letter-spacing: 2px;
  }
`;

const RightNav = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  justify-content: flex-end;

  @media (max-width: ${MOBILE_BP}px) {
    gap: 1rem;
  }
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

/* ====== Search ====== */
const SearchBar = styled.div`
  font-family: "Noto Sans", sans-serif;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color, #ccc);
  border-radius: 4px;
  width: 300px;

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

  /* hide the right-side search on mobile; we show a full-width one below */
  @media (max-width: ${MOBILE_BP}px) {
    display: none;
  }
`;

const MobileSearchContainer = styled.div`
  display: none;

  @media (max-width: ${MOBILE_BP}px) {
    display: block;
    max-width: var(--max-width);
    margin: 0 auto 0.75rem auto;
    padding: 0 var(--padding-lg);
  }

  @media (max-width: 480px) {
    padding: 0 1rem;
  }
`;

const MobileSearchBar = styled(SearchBar)`
  display: none;

  @media (max-width: ${MOBILE_BP}px) {
    display: flex;
    width: 100%;
  }
`;

/* ====== Icons ====== */
const IconLink = styled(Link)`
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

/* ====== Desktop Navigation Bar ====== */
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

  @media (max-width: ${MOBILE_BP}px) {
    display: none; /* keep wide-screen bar untouched; hide on mobile */
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

/* ====== Mobile Menu (overlay) ====== */
const MobileMenu = styled.div`
  position: fixed;
  inset: 0;
  background: var(--background-color, #fff);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding: 0;
  @media (min-width: ${MOBILE_BP + 1}px) {
    display: none;
  }
`;

const MobileMenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem var(--padding-lg);
  border-bottom: 1px solid var(--border-color, #ccc);

  @media (max-width: 480px) {
    padding: 0.75rem 1rem;
  }
`;

const CloseButton = styled(MenuButton)`
  font-size: 1.75rem;
`;

const MobileMenuBody = styled.div`
  padding: 1rem var(--padding-lg) 2rem var(--padding-lg);
  overflow-y: auto;

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const MobileSectionTitle = styled.div`
  font-family: "Nimbus Sans", sans-serif;
  font-size: 0.75rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--text-muted, #666);
  margin: 1rem 0 0.5rem 0;
`;

const MobileList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  li a {
    display: block;
    padding: 0.75rem 0;
    text-decoration: none;
    color: var(--text-color, #333);
    font-family: "Nimbus Sans", sans-serif;
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  li + li {
    border-top: 1px solid var(--border-color, #eee);
  }
`;

/* ====== Component ====== */
const Header: React.FC = () => {
  const {
    state: { itemCount },
  } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <HeaderWrapper>
      <TopBarContainer>
        <TopBar>
          {/* Desktop left nav */}
          <DesktopOnly>
            <LeftNav>
              <NavLink to="/">HOME</NavLink>
              <NavLink to="/about">ABOUT US</NavLink>
              <NavLink to="/contact">CONTACT</NavLink>
            </LeftNav>
          </DesktopOnly>

          {/* Mobile hamburger */}
          <MobileOnly>
            <MenuButton
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <Icon icon={FiMenu} />
            </MenuButton>
          </MobileOnly>

          {/* Logo centered */}
          <Logo to="/">FERONOVA</Logo>

          {/* Right side: desktop search + cart */}
          <RightNav>
            <SearchBar>
              <Icon icon={FiSearch} />
              <input type="text" placeholder="Search tools and supplies..." />
            </SearchBar>

            <IconLink to="/cart" aria-label="Open cart">
              <Icon icon={FiShoppingCart} />
              {itemCount > 0 && <CartCount>{itemCount}</CartCount>}
            </IconLink>
          </RightNav>
        </TopBar>

        {/* Mobile full-width search just under the top bar */}
        <MobileSearchContainer>
          <MobileSearchBar>
            <Icon icon={FiSearch} />
            <input type="text" placeholder="Search tools and supplies..." />
          </MobileSearchBar>
        </MobileSearchContainer>
      </TopBarContainer>

      {/* Desktop category bar unchanged */}
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

      {/* Mobile overlay menu */}
      {menuOpen && (
        <MobileMenu role="dialog" aria-modal="true">
          <MobileMenuHeader>
            <Logo to="/" onClick={() => setMenuOpen(false)}>
              FERONOVA
            </Logo>
            <CloseButton
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <Icon icon={FiX} />
            </CloseButton>
          </MobileMenuHeader>

          <MobileMenuBody>
            <MobileSectionTitle>Site</MobileSectionTitle>
            <MobileList>
              <li>
                <Link to="/" onClick={() => setMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={() => setMenuOpen(false)}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={() => setMenuOpen(false)}>
                  Contact
                </Link>
              </li>
            </MobileList>

            <MobileSectionTitle>Shop Categories</MobileSectionTitle>
            <MobileList>
              <li>
                <Link to="/Bath & Plumbing" onClick={() => setMenuOpen(false)}>
                  Bathroom & Plumbing
                </Link>
              </li>
              <li>
                <Link to="/Landscaping" onClick={() => setMenuOpen(false)}>
                  Landscaping
                </Link>
              </li>
              <li>
                <Link
                  to="/Storage & Shelving"
                  onClick={() => setMenuOpen(false)}
                >
                  Storage & Shelving
                </Link>
              </li>
              <li>
                <Link to="/Lighting" onClick={() => setMenuOpen(false)}>
                  Lighting
                </Link>
              </li>
              <li>
                <Link to="/Doors & Security" onClick={() => setMenuOpen(false)}>
                  Doors & Security
                </Link>
              </li>
              <li>
                <Link to="/Screws & Fixings" onClick={() => setMenuOpen(false)}>
                  Screws & Fixings
                </Link>
              </li>
            </MobileList>
          </MobileMenuBody>
        </MobileMenu>
      )}
    </HeaderWrapper>
  );
};

export default Header;
