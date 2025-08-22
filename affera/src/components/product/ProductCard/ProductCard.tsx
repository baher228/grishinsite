import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import Icon from "../../common/Icon";
import { formatCurrency } from "../../../utils/currency";

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

/* --- CARD: fluid width/height, mobile-safe, no overflow --- */
const Card = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0; /* allow grid to shrink below content’s intrinsic width */
  height: auto; /* remove rigid 550px height */
  contain: layout paint; /* helps performance */
  will-change: transform;

  /* Hover only when a real pointer exists (not on touch) */
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    }
  }

  @media (max-width: 768px) {
    border-radius: 14px;
  }

  @media (max-width: 420px) {
    border-radius: 12px;
  }
`;

const ProductLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

/* --- IMAGE: responsive square (works everywhere) --- */
const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%; /* 1:1 square aspect ratio */
  overflow: hidden;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const ProductImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.06);
  }
`;

const WishlistButton = styled.button`
  position: absolute;
  top: clamp(8px, 2vw, 16px);
  right: clamp(8px, 2vw, 16px);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  width: clamp(36px, 6vw, 44px);
  height: clamp(36px, 6vw, 44px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(0.9rem, 2.4vw, 1.2rem);
  color: var(--text-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease, color 0.2s ease, background 0.2s ease;
  z-index: 2;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: var(--accent-color);
      transform: scale(1.08);
      background: white;
    }
  }
`;

const SaleTag = styled.div`
  position: absolute;
  top: clamp(8px, 2vw, 16px);
  left: clamp(8px, 2vw, 16px);
  background: #e8c444;
  color: black;
  font-size: clamp(0.7rem, 2.2vw, 0.875rem);
  font-weight: 600;
  padding: 0.4rem 0.75rem;
  border-radius: 20px;
  z-index: 2;
`;

/* --- CONTENT: flexible and compact on small screens --- */
const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  padding: clamp(0.75rem, 2.5vw, 1.25rem);
  height: 100%;
`;

const CardInfo = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Brand = styled.span`
  font-size: clamp(0.7rem, 1.9vw, 0.875rem);
  color: var(--text-light);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  font-weight: 500;
`;

const ProductName = styled.h3`
  font-size: clamp(0.9rem, 2.6vw, 1.2rem);
  font-weight: 600;
  color: var(--primary-color);
  margin: 0.5rem 0;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.75rem 0 0.75rem 0;
  flex-wrap: wrap;
`;

const Price = styled.span`
  font-size: clamp(1rem, 3.6vw, 1.4rem);
  font-weight: 700;
  color: var(--primary-color);
`;

const OriginalPrice = styled.span`
  font-size: clamp(0.85rem, 2.8vw, 1.1rem);
  color: var(--text-light);
  text-decoration: line-through;
`;

interface StockStatusProps {
  $inStock?: boolean;
}

const StockStatus = styled.div<StockStatusProps>`
  display: inline-flex;
  align-items: center;
  padding: 0.45rem 0.75rem;
  border-radius: 12px;
  font-weight: 500;
  font-size: clamp(0.75rem, 2.3vw, 0.875rem);
  background-color: ${(props) => (props.$inStock ? "#e8f5e9" : "#ffebee")};
  color: ${(props) => (props.$inStock ? "#2e7d32" : "#c62828")};
  margin-bottom: 0.5rem;
`;

const AddToCartButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, var(--primary-color), #333);
  color: white;
  font-weight: 600;
  padding: clamp(0.6rem, 2.2vw, 0.875rem);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  font-size: clamp(0.82rem, 2.2vw, 1rem);

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: linear-gradient(135deg, #333, #000);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
          <CardInfo>
            <Brand>{product.brand}</Brand>
            <ProductName>{product.name}</ProductName>

            <PriceContainer>
              <Price>{formatCurrency(product.price)}</Price>
              {product.originalPrice && (
                <>
                  <OriginalPrice>
                    {formatCurrency(product.originalPrice)}
                  </OriginalPrice>
                </>
              )}
            </PriceContainer>
          </CardInfo>
          <CardFooter>
            <StockStatus $inStock={product.inStock}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </StockStatus>
            <AddToCartButton onClick={handleAddToCart}>
              <Icon icon={FiShoppingCart} size={20} />
              Add to Cart
            </AddToCartButton>
          </CardFooter>
        </CardContent>
      </ProductLink>
    </Card>
  );
};

export default ProductCard;
export type { Product };
