import * as React from 'react';
import { useEffect, useState } from 'react';

import styled from 'styled-components';
export function TagMapping() {
  return (
    <Container>
      <ListWrapper>
        <strong>태그 선택</strong>
        <span className="sub">매핑할 태그를 선택해주세요.</span>
        <></>
      </ListWrapper>
      <ListItemWrapper>
        <strong>매핑</strong>
      </ListItemWrapper>
    </Container>
  );
}

const Container = styled.div`
  padding-top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const ListWrapper = styled.div``;
const ListItemWrapper = styled.div``;
