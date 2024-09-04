import * as React from 'react';
import { useEffect, useState } from 'react';

import styled from 'styled-components';
export function TagMapping() {
  return (
    <Container>
      <>
        {/* 최초 진입 */}
        <TagListWrapper>
          <strong>태그 선택</strong>
          <span className="sub">매핑할 태그를 선택해주세요.</span>
          <></>
        </TagListWrapper>
      </>
    </Container>
  );
}

const Container = styled.div`
  padding-top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const TagListWrapper = styled.div``;
