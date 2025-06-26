import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../../components/common/Container';
import ProductGrid from '../../components/product/ProductGrid';
import { useCart } from '../../context/CartContext';
import { getProductsBySearch } from '../../data/products';

const SearchWrapper = styled.div`
  padding: 2rem 0;
  min-height: 60vh;
`;

const SearchHeader = styled.div`
  margin-bottom: 2rem;
`;

const SearchTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
`;

const SearchInfo = styled.p`
  color: var(--text-color);
  font-size: 1.1rem;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 4rem 2rem;
`;

const NoResultsTitle = styled.h2`
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const NoResultsText = styled.p`
  color: var(--text-color);
  font-size: 1.1rem;
  line-height: 1.6;
`;

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { addItem } = useCart();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const query = searchParams.get('q') || '';

  useEffect(() => {
    if (query) {
      const results = getProductsBySearch(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [query]);

  if (!query) {
    return (
      <SearchWrapper>
        <Container>
          <SearchHeader>
            <SearchTitle>Search</SearchTitle>
            <SearchInfo>Enter a search term to find products</SearchInfo>
          </SearchHeader>
        </Container>
      </SearchWrapper>
    );
  }

  return (
    <SearchWrapper>
      <Container>
        <SearchHeader>
          <SearchTitle>Search Results</SearchTitle>
          <SearchInfo>
            {searchResults.length > 0 
              ? `Found ${searchResults.length} result${searchResults.length !== 1 ? 's' : ''} for "${query}"`
              : `No results found for "${query}"`
            }
          </SearchInfo>
        </SearchHeader>

        {searchResults.length > 0 ? (
          <ProductGrid 
            products={searchResults}
            onAddToCart={addItem}
          />
        ) : (
          <NoResults>
            <NoResultsTitle>No products found</NoResultsTitle>
            <NoResultsText>
              Try adjusting your search terms or browse our categories to find what you're looking for.
            </NoResultsText>
          </NoResults>
        )}
      </Container>
    </SearchWrapper>
  );
};

export default Search;
