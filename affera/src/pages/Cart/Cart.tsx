import React from 'react';
import styled from 'styled-components';
import Container from '../../components/common/Container';
import { useCart } from '../../context/CartContext';
import Icon from '../../components/common/Icon';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';

const CartWrapper = styled.div`
  padding: 2rem 0;
`;

const CartTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 2rem;
`;

const CartEmpty = styled.div`
  text-align: center;
  padding: 4rem 0;
  color: var(--text-color);
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const ItemImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ItemName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--primary-color);
`;

const ItemBrand = styled.span`
  font-size: 0.9rem;
  color: #666;
  text-transform: uppercase;
`;

const ItemPrice = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--primary-color);
`;

const ItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const QuantityButton = styled.button`
  background-color: #f5f5f5;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--primary-color);
    color: white;
  }
`;

const Quantity = styled.span`
  font-size: 1rem;
  font-weight: 600;
  min-width: 2rem;
  text-align: center;
`;

const RemoveButton = styled.button`
  color: #dc3545;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const CartSummary = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  font-size: 1rem;
  color: var(--text-color);

  &:last-child {
    border-top: 1px solid #eee;
    margin-top: 1rem;
    padding-top: 1rem;
    font-weight: 600;
    font-size: 1.2rem;
    color: var(--primary-color);
  }
`;

const CheckoutButton = styled.button`
  width: 100%;
  background-color: var(--primary-color);
  color: white;
  font-weight: 600;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #333;
  }
`;

const Cart: React.FC = () => {
  const { state, removeItem, updateQuantity } = useCart();

  if (state.items.length === 0) {
    return (
      <Container>
        <CartWrapper>
          <CartTitle>Shopping Cart</CartTitle>
          <CartEmpty>Your cart is empty</CartEmpty>
        </CartWrapper>
      </Container>
    );
  }

  return (
    <Container>
      <CartWrapper>
        <CartTitle>Shopping Cart</CartTitle>
        <CartItems>
          {state.items.map((item) => (
            <CartItem key={item.id}>
              <ItemImage src={item.image} alt={item.name} />
              <ItemInfo>
                <ItemBrand>{item.brand}</ItemBrand>
                <ItemName>{item.name}</ItemName>
                <ItemPrice>${item.price}</ItemPrice>
              </ItemInfo>
              <ItemActions>
                <QuantityControl>
                  <QuantityButton 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <Icon icon={FiMinus} size={16} />
                  </QuantityButton>
                  <Quantity>{item.quantity}</Quantity>
                  <QuantityButton 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Icon icon={FiPlus} size={16} />
                  </QuantityButton>
                </QuantityControl>
                <RemoveButton onClick={() => removeItem(item.id)}>
                  <Icon icon={FiTrash2} size={16} />
                  Remove
                </RemoveButton>
              </ItemActions>
            </CartItem>
          ))}
        </CartItems>

        <CartSummary>
          <SummaryRow>
            <span>Subtotal</span>
            <span>${state.total.toFixed(2)}</span>
          </SummaryRow>
          <SummaryRow>
            <span>Shipping</span>
            <span>Free</span>
          </SummaryRow>
          <SummaryRow>
            <span>Total</span>
            <span>${state.total.toFixed(2)}</span>
          </SummaryRow>
          <CheckoutButton>Proceed to Checkout</CheckoutButton>
        </CartSummary>
      </CartWrapper>
    </Container>
  );
};

export default Cart;
