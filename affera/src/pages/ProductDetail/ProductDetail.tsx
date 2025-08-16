import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Container from "../../components/common/Container";
import { useCart } from "../../context/CartContext";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import Icon from "../../components/common/Icon";
import Loading from "../../components/common/Loading";
import { getProductById } from "../../services/api";

const ProductDetailWrapper = styled.div`
  padding: 3rem 0;
  min-height: 70vh;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ImageSection = styled.div`
  position: relative;
`;

const MainImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const WishlistButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: white;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--text-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;

  &:hover {
    color: var(--accent-color);
    transform: scale(1.1);
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Brand = styled.span`
  font-size: 1rem;
  color: var(--text-light);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ProductName = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin: 0.5rem 0;
  line-height: 1.2;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
`;

const Price = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
`;

const OriginalPrice = styled.span`
  font-size: 1.5rem;
  color: var(--text-light);
  text-decoration: line-through;
`;

const Discount = styled.span`
  background-color: var(--accent-color);
  color: white;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-color);
  margin: 1.5rem 0;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
`;

const Rating = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--accent-color);
`;

const Reviews = styled.span`
  font-size: 1.1rem;
  color: var(--text-light);
`;

const AddToCartButton = styled.button`
  width: 100%;
  max-width: 400px;
  background-color: var(--primary-color);
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: all 0.2s ease;
  margin-top: 2rem;

  &:hover {
    background-color: #333;
    transform: translateY(-2px);
  }
`;

const StockStatus = styled.div<{ inStock?: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  background-color: ${(props) => (props.inStock ? "#e8f5e9" : "#ffebee")};
  color: ${(props) => (props.inStock ? "#2e7d32" : "#c62828")};
`;

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [isLoading, setIsLoading] = React.useState(true);
  const [product, setProduct] = React.useState<any>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const data = await getProductById(Number(id));
        setProduct(data);
      } catch (err) {
        setError("Failed to load product");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (isLoading) {
    return (
      <ProductDetailWrapper>
        <Container>
          <Loading text="Loading product details..." />
        </Container>
      </ProductDetailWrapper>
    );
  }

  if (error || !product) {
    return (
      <ProductDetailWrapper>
        <Container>
          <h1>{error || "Product not found"}</h1>
        </Container>
      </ProductDetailWrapper>
    );
  }

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <ProductDetailWrapper>
      <Container>
        <ProductGrid>
          <ImageSection>
            <MainImage src={product.image} alt={product.name} />
            <WishlistButton>
              <Icon icon={FiHeart} size={24} />
            </WishlistButton>
          </ImageSection>

          <ProductInfo>
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

            {product.rating && product.reviews && (
              <RatingContainer>
                <Rating>{product.rating}★</Rating>
                <Reviews>({product.reviews} reviews)</Reviews>
              </RatingContainer>
            )}

            <StockStatus inStock={product.inStock}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </StockStatus>

            <Description>{product.description}</Description>

            <AddToCartButton onClick={() => addItem(product)}>
              <Icon icon={FiShoppingCart} size={24} />
              Add to Cart
            </AddToCartButton>
          </ProductInfo>
        </ProductGrid>
      </Container>
    </ProductDetailWrapper>
  );
};

export default ProductDetail;
