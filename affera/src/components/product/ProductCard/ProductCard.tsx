import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import Icon from '../../common/Icon';
import { formatCurrency } from '../../../utils/currency';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  brand: string;
  category: string;
  description?: string;
  inStock?: boolean;
  rating?: number;
  reviews?: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const Card = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const ProductLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.08);
  }
`;

const WishlistButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: var(--text-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
  z-index: 2;

  &:hover {
    color: var(--accent-color);
    transform: scale(1.1);
    background: white;
  }
`;

const SaleTag = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: var(--accent-color);
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  z-index: 2;
`;

const CardContent = styled.div`
  padding: 1.75rem;
`;

const Brand = styled.span`
  font-size: 0.875rem;
  color: var(--text-light);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  font-weight: 500;
`;

const ProductName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--primary-color);
  margin: 0.75rem 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 1rem 0;
  flex-wrap: wrap;
`;

const Price = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--primary-color);
`;

const OriginalPrice = styled.span`
  font-size: 1.1rem;
  color: var(--text-light);
  text-decoration: line-through;
`;

const Discount = styled.span`
  background: linear-gradient(135deg, var(--accent-color), #e53e3e);
  color: white;
  font-size: 0.8rem;
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  font-weight: 600;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  font-size: 0.9rem;
`;

const Rating = styled.span`
  color: var(--accent-color);
  font-weight: 600;
`;

const Reviews = styled.span`
  color: var(--text-light);
`;

interface StockStatusProps {
  $inStock?: boolean;
}

const StockStatus = styled.div<StockStatusProps>`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  font-weight: 500;
  font-size: 0.875rem;
  background-color: ${props => props.$inStock ? '#e8f5e9' : '#ffebee'};
  color: ${props => props.$inStock ? '#2e7d32' : '#c62828'};
  margin-bottom: 1rem;
`;

const AddToCartButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, var(--primary-color), #333);
  color: white;
  font-weight: 600;
  padding: 0.875rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  font-size: 1rem;

  &:hover {
    background: linear-gradient(135deg, #333, #000);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Wishlist functionality would go here
  };

  return (
    <Card>
      <ProductLink to={`/product/${product.id}`}>
        <ImageContainer>
          <ProductImage src={product.image} alt={product.name} />
          {product.originalPrice && (
            <SaleTag>Save {discountPercentage}%</SaleTag>
          )}
          <WishlistButton onClick={handleWishlist}>
            <Icon icon={FiHeart} size={20} />
          </WishlistButton>
        </ImageContainer>
        
        <CardContent>
          <Brand>{product.brand}</Brand>
          <ProductName>{product.name}</ProductName>
          
          {(product.rating && product.reviews) && (
            <RatingContainer>
              <Rating>{product.rating}★</Rating>
              <Reviews>({product.reviews} reviews)</Reviews>
            </RatingContainer>
          )}
          
          <PriceContainer>
            <Price>{formatCurrency(product.price)}</Price>
            {product.originalPrice && (
              <>
                <OriginalPrice>{formatCurrency(product.originalPrice)}</OriginalPrice>
                <Discount>Save {discountPercentage}%</Discount>
              </>
            )}
          </PriceContainer>

          <StockStatus $inStock={product.inStock}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </StockStatus>
          
          <AddToCartButton onClick={handleAddToCart}>
            <Icon icon={FiShoppingCart} size={20} />
            Add to Cart
          </AddToCartButton>
        </CardContent>
      </ProductLink>
    </Card>
  );
};

export default ProductCard;
export type { Product };
