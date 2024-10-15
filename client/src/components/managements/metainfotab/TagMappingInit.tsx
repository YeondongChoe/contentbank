import * as React from 'react';
import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { Icon } from '../../../components/atom';
export function TagMappingInit() {
  return (
    <Container>
      {/* 최초 진입 */}
      <ListWrapper>
        <strong>카테고리 순서</strong>
        <span className="sub">매핑할 태그 간의 순서를 지정해주세요.</span>
        <TagsWrappper>
          <Tags>
            <span>
              <Icon width={`18px`} src={`/images/icon/icon-move.svg`} />
            </span>
            <span>{`${'교육 과정'}`}</span>
            <span>{`${4}`}개의 태그</span>
          </Tags>
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
const TagsWrappper = styled.div`
  border: 1px solid #eee;
`;
const Tags = styled.div`
  padding: 8px 10px;
  display: flex;
`;
const ListWrapper = styled.div``;
const ListItemWrapper = styled.div``;
