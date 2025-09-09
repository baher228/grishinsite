import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Container from "../../components/common/Container";
import { useCart } from "../../context/CartContext";
import {
  FiShoppingCart,
  FiHeart,
  FiTruck,
  FiRefreshCcw,
  FiShield,
} from "react-icons/fi";
import Icon from "../../components/common/Icon";
import Loading from "../../components/common/Loading";
import { getProductById } from "../../services/api";

/* ---------- Helpers ---------- */

const formatCurrency = (value: number, currency = "GBP", locale = "en-GB") =>
  new Intl.NumberFormat(locale, { style: "currency", currency }).format(value);

const clamp = (min: number, value: number, max: number) =>
  Math.min(Math.max(value, min), max);

/* ---------- Styled ---------- */

const ProductDetailWrapper = styled.div`
  --surface: #ffffff;
  --surface-muted: #f7f7f8;
  --ring: rgba(0, 0, 0, 0.08);

  padding: 3rem 0;
  min-height: 70vh;
  @media (max-width: 768px) {
    padding: 0;
    min-height: 50vh;
  }
  background: radial-gradient(
      60rem 60rem at 10% -10%,
      rgba(0, 0, 0, 0.03),
      transparent 60%
    ),
    radial-gradient(
      60rem 60rem at 110% 10%,
      rgba(0, 0, 0, 0.03),
      transparent 60%
    );
`;

const ProductCard = styled.div`
  background: var(--surface);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
  padding: 2rem;
  /* ensure inner content respects rounded corners */
  overflow: hidden;

  /* On mobile, square the bottom to mate cleanly with the sticky bar */
  @media (max-width: 768px) {
    padding-bottom: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: 3rem;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ImageSection = styled.section`
  position: relative;
`;

const MainImageWrap = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 12px; /* rounded corners only, no border/frame */
`;

const MainImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  /* no hover animations, no borders, no extra padding */
`;

const WishlistButton = styled.button<{ $active?: boolean }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid var(--ring);
  border-radius: 999px;
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  font-size: 1.5rem;
  color: ${(p) => (p.$active ? "var(--accent-color)" : "var(--text-color)")};
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(6px);
  transition: transform 160ms ease, color 160ms ease, background 160ms ease,
    box-shadow 160ms ease;

  &:hover {
    transform: translateY(-2px) scale(1.04);
    color: var(--accent-color);
    background: #fff;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.14);
  }

  &:focus-visible {
    outline: 3px solid var(--accent-color);
    outline-offset: 2px;
  }
`;

const ProductInfo = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Brand = styled.span`
  font-size: 0.9rem;
  color: var(--text-light);
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const ProductName = styled.h1`
  font-size: clamp(1.6rem, 2.4vw, 2.5rem);
  font-weight: 800;
  color: var(--primary-color);
  margin: 0.25rem 0 0.5rem;
  line-height: 1.15;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.06),
    rgba(0, 0, 0, 0.02) 40%,
    rgba(0, 0, 0, 0)
  );
  margin: 0.75rem 0 0.5rem;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
  margin: 0.4rem 0 0.2rem;
`;

const Price = styled.span`
  font-size: clamp(1.6rem, 2.2vw, 2rem);
  font-weight: 800;
  color: var(--primary-color);
`;

const OriginalPrice = styled.span`
  font-size: 1.1rem;
  color: var(--text-light);
  text-decoration: line-through;
`;

const Discount = styled.span`
  background: linear-gradient(135deg, var(--accent-color), #e44d26);
  color: white;
  font-size: 0.9rem;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  font-weight: 700;
  letter-spacing: 0.02em;
  box-shadow: 0 6px 14px rgba(228, 77, 38, 0.35);
`;

const Savings = styled.div`
  font-size: 0.95rem;
  color: var(--text-light);
`;

const StockStatus = styled.div<{ inStock?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 999px;
  font-weight: 600;
  background-color: ${(props) => (props.inStock ? "#e8f5e9" : "#ffebee")};
  color: ${(props) => (props.inStock ? "#2e7d32" : "#c62828")};
  border: 1px solid ${(props) => (props.inStock ? "#c8e6c9" : "#ffcdd2")};

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: ${(props) => (props.inStock ? "#2e7d32" : "#c62828")};
  }
`;

const Description = styled.p<{ $expanded?: boolean }>`
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--text-color);
  margin: 0.75rem 0 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: ${(p) => (p.$expanded ? "unset" : 5)};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ToggleDesc = styled.button`
  align-self: flex-start;
  margin-top: 0.25rem;
  background: transparent;
  border: none;
  color: var(--accent-color);
  font-weight: 700;
  cursor: pointer;
  padding: 0.25rem 0;
  border-bottom: 2px solid transparent;
  transition: border-color 140ms ease;

  &:hover {
    border-color: var(--accent-color);
  }
  &:focus-visible {
    outline: 3px solid var(--accent-color);
    outline-offset: 2px;
  }
`;

const TrustRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
  margin: 0.75rem 0 0.25rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
  @media (max-width: 768px) {
    padding-bottom: 0.85rem;
  }
`;

const TrustChip = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.65rem 0.8rem;
  border-radius: 12px;
  background: var(--surface-muted);
  border: 1px solid var(--ring);
  font-size: 0.95rem;
`;

const AddToCartButton = styled.button`
  width: 100%;
  max-width: 420px;
  background-color: var(--primary-color);
  color: white;
  font-size: 1.1rem;
  font-weight: 800;
  padding: 1rem 1.25rem;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: transform 160ms ease, box-shadow 160ms ease,
    background-color 160ms ease;
  margin-top: 1rem;
  box-shadow: 0 12px 22px rgba(0, 0, 0, 0.12);

  &:hover {
    background-color: #333;
    transform: translateY(-2px);
    box-shadow: 0 16px 28px rgba(0, 0, 0, 0.16);
  }

  &:active {
    transform: translateY(0);
  }
  &:focus-visible {
    outline: 3px solid var(--accent-color);
    outline-offset: 3px;
  }
`;

/* Hide inline button on mobile to avoid duplication with sticky bar */
const AddToCartInline = styled(AddToCartButton)`
  @media (max-width: 768px) {
    display: none;
  }
`;

/* ------- Mobile Sticky Bar: square top to align with card, same surface ------- */
const MobileStickyBar = styled.div`
  position: sticky;
  bottom: 0;
  inset-inline: 0;
  z-index: 20;
  display: none;
  background: var(--surface); /* same as card */
  backdrop-filter: blur(10px);
  border-top: 1px solid var(--ring);
  /* soft top shadow for depth */
  border-radius: 0 0 12px 12px;
  padding: 0.75rem 1rem;
  padding-bottom: max(0.75rem, env(safe-area-inset-bottom));
  /* keep top edges square to mate with squared card bottom */
  border-top-left-radius: 0;
  border-top-right-radius: 0;

  @media (max-width: 768px) {
    display: block;
  }
`;

const StickyInner = styled.div`
  display: grid;
  grid-template-columns: minmax(0, auto) 1fr;
  align-items: center;
  gap: 0.75rem;
`;

const StickyPrice = styled.div`
  display: grid;
  gap: 0.15rem;

  strong {
    font-size: 1.1rem;
    line-height: 1.1;
  }

  span {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.9rem;
    color: var(--text-light);
  }

  s {
    color: var(--text-light);
    opacity: 0.9;
  }
`;

const StickyDiscountBadge = styled.em`
  font-style: normal;
  font-weight: 800;
  font-size: 0.8rem;
  padding: 0.15rem 0.4rem;
  border-radius: 999px;
  background: var(--surface-muted);
  border: 1px solid var(--ring);
`;

const StickyCTA = styled.button`
  width: 100%;
  height: 52px;
  border-radius: 16px;
  background: var(--primary-color);
  color: #fff;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.16);
  transition: transform 140ms ease, box-shadow 140ms ease,
    background-color 140ms ease;

  &:hover {
    background: #333;
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
  }
  &:focus-visible {
    outline: 3px solid var(--accent-color);
    outline-offset: 2px;
  }
`;

/* ---------- Component ---------- */

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();

  const [isLoading, setIsLoading] = React.useState(true);
  const [product, setProduct] = React.useState<any>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [wishlisted, setWishlisted] = React.useState(false);
  const [descExpanded, setDescExpanded] = React.useState(false);

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

  const hasOriginal =
    typeof product.originalPrice === "number" &&
    product.originalPrice > product.price;
  const discountPercentage = hasOriginal
    ? clamp(
        0,
        Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        ),
        95
      )
    : 0;
  const savingsValue = hasOriginal ? product.originalPrice - product.price : 0;

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <ProductDetailWrapper>
      <Container>
        <ProductCard role="region" aria-label="Product details">
          <ProductGrid>
            {/* ------- Left: Image ------- */}
            <ImageSection aria-label="Product image">
              <MainImageWrap>
                <MainImage
                  src={product.image}
                  alt={product.name}
                  loading="eager"
                  decoding="async"
                />
                <WishlistButton
                  type="button"
                  aria-label={
                    wishlisted ? "Remove from wishlist" : "Add to wishlist"
                  }
                  aria-pressed={wishlisted}
                  onClick={() => setWishlisted((s) => !s)}
                  $active={wishlisted}
                  title={wishlisted ? "Wishlisted" : "Add to wishlist"}
                >
                  <Icon icon={FiHeart} size={22} />
                </WishlistButton>
              </MainImageWrap>
            </ImageSection>

            {/* ------- Right: Info ------- */}
            <ProductInfo>
              <Brand>{product.brand === "Unknown" ? "" : product.brand}</Brand>
              <ProductName>{product.name}</ProductName>
              <Divider />

              <PriceRow>
                <Price>{formatCurrency(product.price)}</Price>
                {hasOriginal && (
                  <>
                    <OriginalPrice>
                      {formatCurrency(product.originalPrice)}
                    </OriginalPrice>
                    <Discount>Save {discountPercentage}%</Discount>
                  </>
                )}
              </PriceRow>

              {hasOriginal && (
                <Savings>
                  You save <strong>{formatCurrency(savingsValue)}</strong>{" "}
                  compared to the original price.
                </Savings>
              )}

              <StockStatus
                inStock={product.stock > 0}
                role="status"
                aria-live="polite"
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </StockStatus>

              <Description $expanded={descExpanded}>
                {product.description}
              </Description>
              {product?.description && product.description.length > 220 && (
                <ToggleDesc onClick={() => setDescExpanded((v) => !v)}>
                  {descExpanded ? "Read less" : "Read more"}
                </ToggleDesc>
              )}

              <TrustRow aria-label="Assurances">
                <TrustChip>
                  <Icon icon={FiTruck} size={18} />
                  Fast shipping
                </TrustChip>
                <TrustChip>
                  <Icon icon={FiRefreshCcw} size={18} />
                  30-day returns
                </TrustChip>
                <TrustChip>
                  <Icon icon={FiShield} size={18} />
                  Secure checkout
                </TrustChip>
              </TrustRow>

              {/* Inline Add to Cart hidden on mobile to prevent duplication */}
              <AddToCartInline onClick={handleAddToCart}>
                <Icon icon={FiShoppingCart} size={22} />
                Add to Cart
              </AddToCartInline>
            </ProductInfo>
          </ProductGrid>
        </ProductCard>

        {/* ------- Mobile sticky CTA (flush with card) ------- */}
        <MobileStickyBar aria-label="Quick actions">
          <StickyInner>
            <StickyPrice>
              <strong>{formatCurrency(product.price)}</strong>
              {hasOriginal && (
                <span>
                  <s>{formatCurrency(product.originalPrice)}</s>
                  <StickyDiscountBadge>
                    -{discountPercentage}%
                  </StickyDiscountBadge>
                </span>
              )}
            </StickyPrice>

            <StickyCTA onClick={handleAddToCart} aria-label="Add to cart">
              <Icon icon={FiShoppingCart} size={20} />
              Add to Cart
            </StickyCTA>
          </StickyInner>
        </MobileStickyBar>
      </Container>
    </ProductDetailWrapper>
  );
};

export default ProductDetail;
