import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useModal } from '../../../hooks';
import { COLOR } from '../../constants';

export function SchoolInputModal() {
  const location = useLocation();
  const navigate = useNavigate();
  const { closeModal } = useModal();

  return (
    <Container>
      <Title>학교</Title>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;
const Title = styled.strong`
  position: absolute;
  top: -25px;
  left: 15px;
  font-weight: bold;
  color: ${COLOR.FONT_BLACK};
`;
