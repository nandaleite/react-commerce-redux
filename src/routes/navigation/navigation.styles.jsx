import { Link } from "react-router-dom";
import styled from "styled-components";

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;
`;

export const NavigationList = styled.ul`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  list-style: none;
`;

export const NavigationListItem = styled.li`
  padding: 10px 15px;
  cursor: pointer;
  text-transform: uppercase;
`;

export const NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;
