import * as React from 'react';
import { useEffect, useState } from 'react';

import styled from 'styled-components';
export function TagMappingInit() {
  return (
    <Container>
      {/* 최초 진입 */}
      <ListWrapper>
        <strong>카테고리 순서</strong>
        <span className="sub">매핑할 태그 간의 순서를 지정해주세요.</span>
        <TagsWrappper>
          <Tags></Tags>
        </TagsWrappper>
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
const Tags = styled.div``;
const TagsWrappper = styled.div``;
const ListWrapper = styled.div``;
const ListItemWrapper = styled.div``;
