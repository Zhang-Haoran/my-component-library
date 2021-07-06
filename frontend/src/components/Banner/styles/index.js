import styled from 'styled-components';

export const Container = styled.section`
  background: url(${({img})=>img}) no-repeat center;
  background-size: cover;
  height: 370px;
  display: flex;
`;
export const Title = styled.h1`
  margin: 280px 156px;
  font-family: Poppins,sans-serif;
  font-size: 36px;
  font-weight: bold;
  text-align: left;
  color: #ffffff;
`;

