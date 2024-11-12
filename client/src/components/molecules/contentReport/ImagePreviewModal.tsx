import * as React from 'react';

import { styled } from 'styled-components';

import { useModal } from '../../../hooks';
import { COLOR } from '../../constants';

type ImagePreviewModalProps = {
  imgSrc: string;
};

export function ImagePreviewModal({ imgSrc }: ImagePreviewModalProps) {
  const { closeModal } = useModal();

  return (
    <Container>
      <img className="icon" src={imgSrc} width={'100%'} height={'100%'}></img>
    </Container>
  );
}

const Container = styled.div`
  width: 650px;
  height: 650px;
  padding: 10px 0;
`;
