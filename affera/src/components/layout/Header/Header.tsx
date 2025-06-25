import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiSearch, FiUser, FiShoppingCart } from 'react-icons/fi';
import Container from '../../common/Container';
import Icon from '../../common/Icon';
import { useCart } from '../../../context/CartContext';

const HeaderWrapper = styled.header`
  height: var(--header-height);
  border-bottom: 1px solid var(--border-color);
  background-color: var(--background-color);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const HeaderContainer = styled(Container)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary-color);
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-color);
  transition: color 0.2s ease;

  &:hover {
    color: var(--accent-color);
  }
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  max-width: 400px;
  flex: 1;
  margin: 0 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 2px solid var(--border-color);
  border-radius: 25px;
  font-size: 0.9rem;
  background-color: var(--background-light);
  transition: all 0.2s ease;

  &:focus {
    border-color: var(--primary-color);
    background-color: white;
    box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.1);
  }

  &::placeholder {
    color: var(--text-light);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  color: var(--text-light);
  pointer-events: none;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const IconButton = styled.button`
  font-size: 1.5rem;
  color: var(--text-color);
  display: flex;
  align-items: center;
  transition: color 0.2s ease;

  &:hover {
    color: var(--accent-color);
  }
`;

const CartCount = styled.span`
  background-color: var(--accent-color);
  color: white;
  font-size: 0.75rem;
  padding: 0.1rem 0.4rem;
  border-radius: 50%;
  position: absolute;
  top: -5px;
  right: -8px;
`;

const CartWrapper = styled.div`
  position: relative;
`;

const Header: React.FC = () => {
  const { state } = useCart();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <Logo to="/">Affera</Logo>
        
        <Nav>
          <NavLink to="/tools">Tools</NavLink>
          <NavLink to="/plumbing">Plumbing</NavLink>
          <NavLink to="/construction">Construction</NavLink>
          <NavLink to="/brands">Brands</NavLink>
          <NavLink to="/sale">Sale</NavLink>
        </Nav>

        <SearchContainer>
          <SearchIcon>
            <Icon icon={FiSearch} size={18} />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Search for tools, plumbing supplies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>

        <Actions>
          <IconButton>
            <Icon icon={FiUser} size={24} />
          </IconButton>
          <IconButton as={Link} to="/cart">
            <CartWrapper>
              <Icon icon={FiShoppingCart} size={24} />
              {state.itemCount > 0 && <CartCount>{state.itemCount}</CartCount>}
            </CartWrapper>
          </IconButton>
        </Actions>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;
