import React, { useState } from 'react';
import styled from 'styled-components';
import Container from '../../components/common/Container';
import { 
  FiUser, 
  FiShoppingBag, 
  FiHeart, 
  FiSettings, 
  FiLogOut, 
  FiEdit3, 
  FiEye,
  FiTruck,
  FiClock,
  FiCheckCircle,
  FiXCircle
} from 'react-icons/fi';
import Icon from '../../components/common/Icon';

const DashboardWrapper = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
`;

const DashboardHeader = styled.section`
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: white;
  padding: clamp(2rem, 4vw, 3rem) 0;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
`;

const WelcomeSection = styled.div`
  h1 {
    font-size: clamp(1.75rem, 4vw, 2.25rem);
    font-weight: 700;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #3CB371, #00FF7F);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    opacity: 0.9;
    font-size: clamp(0.9rem, 2vw, 1rem);
  }
`;

const QuickActions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const DashboardContent = styled.section`
  padding: clamp(2rem, 4vw, 3rem) 0;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: 300px 1fr;
    gap: 3rem;
  }
`;

const Sidebar = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  height: fit-content;
  border: 1px solid #f0f0f0;
`;

const SidebarTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li<{ active?: boolean }>`
  margin-bottom: 0.5rem;

  a {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    text-decoration: none;
    color: ${props => props.active ? '#3CB371' : '#666'};
    background: ${props => props.active ? 'rgba(60, 179, 113, 0.1)' : 'transparent'};
    transition: all 0.3s ease;
    font-size: 0.9rem;

    &:hover {
      background: rgba(60, 179, 113, 0.1);
      color: #3CB371;
    }
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  }
`;

const StatIcon = styled.div<{ color: string }>`
  width: 50px;
  height: 50px;
  background: ${props => props.color};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 1rem;
`;

const StatNumber = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const ContentCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 1.5rem;
  }
`;

const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e9ecef;
`;

const OrderInfo = styled.div`
  flex: 1;

  h4 {
    font-size: 0.95rem;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 0.25rem;
  }

  p {
    font-size: 0.85rem;
    color: #666;
    margin: 0;
  }
`;

const OrderStatus = styled.span<{ status: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  background: ${props => {
    switch (props.status) {
      case 'delivered': return '#d4edda';
      case 'shipped': return '#d1ecf1';
      case 'processing': return '#fff3cd';
      case 'cancelled': return '#f8d7da';
      default: return '#e2e3e5';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'delivered': return '#155724';
      case 'shipped': return '#0c5460';
      case 'processing': return '#856404';
      case 'cancelled': return '#721c24';
      default: return '#383d41';
    }
  }};
`;

const OrderActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: 1rem;
`;

const ActionBtn = styled.button`
  background: none;
  border: 1px solid #ddd;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  color: #666;
  transition: all 0.3s ease;

  &:hover {
    background: #f8f9fa;
    color: #3CB371;
    border-color: #3CB371;
  }
`;

const ProfileSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ProfileCard = styled.div`
  h4 {
    font-size: 1rem;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  gap: 0.75rem;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  label {
    font-size: 0.9rem;
    color: #666;
  }

  span {
    font-size: 0.9rem;
    color: #1a1a1a;
    font-weight: 500;
  }
`;

const EditButton = styled.button`
  background: none;
  border: none;
  color: #3CB371;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(60, 179, 113, 0.1);
  }
`;

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const mockOrders = [
    {
      id: '#ORD-001',
      product: 'Professional Drill Set',
      date: '2024-01-15',
      status: 'delivered',
      total: '$119.99'
    },
    {
      id: '#ORD-002',
      product: 'Adjustable Wrench Set',
      date: '2024-01-10',
      status: 'shipped',
      total: '$71.99'
    },
    {
      id: '#ORD-003',
      product: 'Copper Pipe Fitting Kit',
      date: '2024-01-08',
      status: 'processing',
      total: '$27.99'
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <StatsGrid>
              <StatCard>
                <StatIcon color="linear-gradient(135deg, #3CB371, #00FF7F)">
                  <Icon icon={FiShoppingBag} size={20} />
                </StatIcon>
                <StatNumber>12</StatNumber>
                <StatLabel>Total Orders</StatLabel>
              </StatCard>
              <StatCard>
                <StatIcon color="linear-gradient(135deg, #17a2b8, #20c997)">
                  <Icon icon={FiTruck} size={20} />
                </StatIcon>
                <StatNumber>3</StatNumber>
                <StatLabel>Active Orders</StatLabel>
              </StatCard>
              <StatCard>
                <StatIcon color="linear-gradient(135deg, #ffc107, #fd7e14)">
                  <Icon icon={FiHeart} size={20} />
                </StatIcon>
                <StatNumber>8</StatNumber>
                <StatLabel>Wishlist Items</StatLabel>
              </StatCard>
              <StatCard>
                <StatIcon color="linear-gradient(135deg, #6f42c1, #e83e8c)">
                  <Icon icon={FiClock} size={20} />
                </StatIcon>
                <StatNumber>2</StatNumber>
                <StatLabel>Pending Reviews</StatLabel>
              </StatCard>
            </StatsGrid>

            <ContentCard>
              <h3>Recent Orders</h3>
              <OrdersList>
                {mockOrders.map((order) => (
                  <OrderItem key={order.id}>
                    <OrderInfo>
                      <h4>{order.id} - {order.product}</h4>
                      <p>Ordered on {order.date} • {order.total}</p>
                    </OrderInfo>
                    <OrderStatus status={order.status}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </OrderStatus>
                    <OrderActions>
                      <ActionBtn title="View Order">
                        <Icon icon={FiEye} size={16} />
                      </ActionBtn>
                      <ActionBtn title="Track Order">
                        <Icon icon={FiTruck} size={16} />
                      </ActionBtn>
                    </OrderActions>
                  </OrderItem>
                ))}
              </OrdersList>
            </ContentCard>
          </>
        );

      case 'profile':
        return (
          <ContentCard>
            <h3>Profile Information</h3>
            <ProfileSection>
              <ProfileCard>
                <h4>
                  Personal Information
                  <EditButton>
                    <Icon icon={FiEdit3} size={16} />
                  </EditButton>
                </h4>
                <InfoGrid>
                  <InfoItem>
                    <label>Full Name</label>
                    <span>John Davis</span>
                  </InfoItem>
                  <InfoItem>
                    <label>Email</label>
                    <span>john.davis@email.com</span>
                  </InfoItem>
                  <InfoItem>
                    <label>Phone</label>
                    <span>+1 (234) 567-8900</span>
                  </InfoItem>
                  <InfoItem>
                    <label>Member Since</label>
                    <span>January 2023</span>
                  </InfoItem>
                </InfoGrid>
              </ProfileCard>

              <ProfileCard>
                <h4>
                  Shipping Address
                  <EditButton>
                    <Icon icon={FiEdit3} size={16} />
                  </EditButton>
                </h4>
                <InfoGrid>
                  <InfoItem>
                    <label>Address</label>
                    <span>123 Main Street</span>
                  </InfoItem>
                  <InfoItem>
                    <label>City</label>
                    <span>Construction City</span>
                  </InfoItem>
                  <InfoItem>
                    <label>State</label>
                    <span>CC</span>
                  </InfoItem>
                  <InfoItem>
                    <label>ZIP Code</label>
                    <span>12345</span>
                  </InfoItem>
                </InfoGrid>
              </ProfileCard>
            </ProfileSection>
          </ContentCard>
        );

      case 'orders':
        return (
          <ContentCard>
            <h3>Order History</h3>
            <OrdersList>
              {mockOrders.map((order) => (
                <OrderItem key={order.id}>
                  <OrderInfo>
                    <h4>{order.id} - {order.product}</h4>
                    <p>Ordered on {order.date} • {order.total}</p>
                  </OrderInfo>
                  <OrderStatus status={order.status}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </OrderStatus>
                  <OrderActions>
                    <ActionBtn title="View Order">
                      <Icon icon={FiEye} size={16} />
                    </ActionBtn>
                    <ActionBtn title="Track Order">
                      <Icon icon={FiTruck} size={16} />
                    </ActionBtn>
                  </OrderActions>
                </OrderItem>
              ))}
            </OrdersList>
          </ContentCard>
        );

      default:
        return null;
    }
  };

  return (
    <DashboardWrapper>
      <DashboardHeader>
        <Container>
          <HeaderContent>
            <WelcomeSection>
              <h1>Welcome back, John!</h1>
              <p>Manage your account and track your orders</p>
            </WelcomeSection>
            <QuickActions>
              <ActionButton>
                <Icon icon={FiShoppingBag} size={16} />
                Continue Shopping
              </ActionButton>
              <ActionButton>
                <Icon icon={FiLogOut} size={16} />
                Sign Out
              </ActionButton>
            </QuickActions>
          </HeaderContent>
        </Container>
      </DashboardHeader>

      <DashboardContent>
        <Container>
          <DashboardGrid>
            <Sidebar>
              <SidebarTitle>Dashboard Menu</SidebarTitle>
              <NavList>
                <NavItem active={activeTab === 'overview'}>
                  <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('overview'); }}>
                    <Icon icon={FiUser} size={18} />
                    Overview
                  </a>
                </NavItem>
                <NavItem active={activeTab === 'profile'}>
                  <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('profile'); }}>
                    <Icon icon={FiUser} size={18} />
                    Profile
                  </a>
                </NavItem>
                <NavItem active={activeTab === 'orders'}>
                  <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('orders'); }}>
                    <Icon icon={FiShoppingBag} size={18} />
                    Orders
                  </a>
                </NavItem>
                <NavItem active={activeTab === 'wishlist'}>
                  <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('wishlist'); }}>
                    <Icon icon={FiHeart} size={18} />
                    Wishlist
                  </a>
                </NavItem>
                <NavItem active={activeTab === 'settings'}>
                  <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('settings'); }}>
                    <Icon icon={FiSettings} size={18} />
                    Settings
                  </a>
                </NavItem>
              </NavList>
            </Sidebar>

            <MainContent>
              {renderContent()}
            </MainContent>
          </DashboardGrid>
        </Container>
      </DashboardContent>
    </DashboardWrapper>
  );
};

export default Dashboard;
