import styled from "styled-components";
import { Link } from "react-router-dom";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: #f5f5f5;
`;

export const HomeTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: #333;
`;

export const HomeSubtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  color: #333;
`;

export const HomeDescription = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  color: #333;
`;

export const HomeButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 50px;
  margin-top: 1rem;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 600;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #000;
  }
`;
