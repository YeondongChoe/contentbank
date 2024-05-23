import * as React from 'react';
import { useState } from 'react';

import { IoMdClose } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export function Formula() {
  const location = useLocation();
  const navigate = useNavigate();

  const closePopup = () => {
    // setIsOpenPopup(false);
  };
  return <Container></Container>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
