import React from 'react';
import styled from 'styled-components';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import Icon from '../../common/Icon';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  brand: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const Card = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const WishlistButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: var(--text-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    color: var(--accent-color);
    transform: scale(1.1);
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const Brand = styled.span`
  font-size: 0.875rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ProductName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--primary-color);
  margin: 0.5rem 0;
  line-height: 1.4;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Price = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary-color);
`;

const OriginalPrice = styled.span`
  font-size: 1rem;
  color: #999;
  text-decoration: line-through;
`;

const Discount = styled.span`
  background-color: var(--accent-color);
  color: white;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: 600;
`;

const AddToCartButton = styled.button`
  width: 100%;
  background-color: var(--primary-color);
  color: white;
  font-weight: 600;
  padding: 0.75rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: #333;
    transform: translateY(-1px);
  }
`;

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card>
      <ImageContainer>
        <ProductImage src={product.image} alt={product.name} />
        <WishlistButton>
          <Icon icon={FiHeart} size={20} />
        </WishlistButton>
      </ImageContainer>
      
      <CardContent>
        <Brand>{product.brand}</Brand>
        <ProductName>{product.name}</ProductName>
        
        <PriceContainer>
          <Price>${product.price}</Price>
          {product.originalPrice && (
            <>
              <OriginalPrice>${product.originalPrice}</OriginalPrice>
              <Discount>Save {discountPercentage}%</Discount>
            </>
          )}
        </PriceContainer>
        
        <AddToCartButton onClick={() => onAddToCart(product)}>
          <Icon icon={FiShoppingCart} size={20} />
          Add to Cart
        </AddToCartButton>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
export type { Product };
