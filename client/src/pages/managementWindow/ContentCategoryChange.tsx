import * as React from 'react';
import { useState, useEffect } from 'react';

import { PiArrowCounterClockwise } from 'react-icons/pi';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { MathViewer, Button } from '../../components';
import { Select } from '../../components/atom/select';
import dummy from '../../components/contents/createcontent/data.json';
import Contents2 from '../../components/mathViewer/test2.json';

export function ContentCategoryChange() {
  return <Container></Container>;
}

const Container = styled.div``;
