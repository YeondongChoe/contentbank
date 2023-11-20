import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { getCookie, setCookie } from '../../utils/ReactCookie';
import { CheckBoxValue, IsChangedServicedValue } from '../../recoil/ValueState';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';

import { Button } from '@mui/material';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const SelectBar = () => {
  const [didMount, setDidMount] = useState(false);
  let mountCount = 1;

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [contentSeq, setContentSeq] = useRecoilState(CheckBoxValue);
  const setIsChangedServiced = useSetRecoilState(IsChangedServicedValue);
  const formattedArray = contentSeq.map((value) => ({ contentSeq: value }));

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const changeServiced = async () => {
    await axios
      .put(
        `/question-service/api/v1/questions/change-serviced`,
        { changeServiceds: formattedArray },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie('accessToken')}`,
          },
        },
      )
      .then((response) => {
        if (response.status === 200) {
          if (response.headers['authorization'] !== getCookie('accessToken')) {
            setCookie('accessToken', response.headers['authorization'], {
              path: '/',
              sameSite: 'strict',
              secure: false,
            });
          }
        }
        setIsChangedServiced(true);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const changeServicedSubmit = () => {
    changeServiced();
    setContentSeq([]);
  };

  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  useEffect(() => {
    mountCount++;
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      console.log('select bar list 불러오는 함수');
    }
  }, [didMount]);

  return (
    <S.mainContainer>
      <S.selectContainer>
        <FormControl sx={{ backgroundColor: 'white', height: 40 }}>
          <InputLabel size="small" id="개정과정">
            개정과정
          </InputLabel>
          <Select
            labelId="개정과정"
            id="select"
            value={age}
            label="개정과정"
            onChange={handleChange}
            sx={{ minWidth: 120, height: 40 }}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ backgroundColor: 'white', height: 40 }}>
          <InputLabel size="small" id="학교">
            학교
          </InputLabel>
          <Select
            labelId="학교"
            id="select"
            value={age}
            label="학교"
            onChange={handleChange}
            sx={{ minWidth: 120, height: 40 }}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ backgroundColor: 'white', height: 40 }}>
          <InputLabel size="small" id="학년">
            학년
          </InputLabel>
          <Select
            labelId="학년"
            id="select"
            value={age}
            label="학년"
            onChange={handleChange}
            sx={{ minWidth: 120, height: 40 }}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ backgroundColor: 'white', height: 40 }}>
          <InputLabel size="small" id="대분류">
            대분류
          </InputLabel>
          <Select
            labelId="대분류"
            id="select"
            value={age}
            label="대분류"
            onChange={handleChange}
            sx={{ minWidth: 120, height: 40 }}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ backgroundColor: 'white', height: 40 }}>
          <InputLabel size="small" id="중분류">
            중분류
          </InputLabel>
          <Select
            labelId="중분류"
            id="select"
            value={age}
            label="중분류"
            onChange={handleChange}
            sx={{ minWidth: 120, height: 40 }}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ backgroundColor: 'white', height: 40 }}>
          <InputLabel size="small" id="문항타입">
            문항타입
          </InputLabel>
          <Select
            labelId="문항타입"
            id="select"
            value={age}
            label="문항타입"
            onChange={handleChange}
            sx={{ minWidth: 120, height: 40 }}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ backgroundColor: 'white', height: 40 }}>
          <InputLabel size="small" id="오픈여부">
            오픈여부
          </InputLabel>
          <Select
            labelId="오픈여부"
            id="select"
            value={age}
            label="오픈여부"
            onChange={handleChange}
            sx={{ minWidth: 120, height: 40 }}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </S.selectContainer>
      <S.btncontainer>
        <S.btnWrapper>
          <StyledEditBtn
            aria-describedby={id}
            variant="outlined"
            sx={{ backgroundColor: 'white' }}
            onClick={handleClick}
          >
            수정
          </StyledEditBtn>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            sx={{ marginTop: '5px' }}
          >
            <S.popoverMenu>수정</S.popoverMenu>
            <S.popoverMenu>복제 후 수정</S.popoverMenu>
          </Popover>
        </S.btnWrapper>
        <S.btnWrapper>
          <StyledActionBtn
            variant="outlined"
            sx={{ backgroundColor: 'white' }}
            onClick={changeServicedSubmit}
          >
            활성화/비활성화
          </StyledActionBtn>
        </S.btnWrapper>
      </S.btncontainer>
    </S.mainContainer>
  );
};

const S = {
  mainContainer: styled.div`
    margin: 40px 10px 20px 50px;
    display: flex;
    justify-content: space-between;
  `,
  selectContainer: styled.div`
    display: flex;
    gap: 10px;
  `,
  select: styled.select``,
  btncontainer: styled.div`
    display: flex;
    gap: 10px;
  `,
  option: styled.option``,
  btnWrapper: styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
  `,
  popoverMenu: styled.div`
    width: 100px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    cursor: pointer;
    &:nth-child(2) {
      border-top: 2px solid #dde1e9;
    }
    &:hover {
      background-color: #422afb;
      color: white;
    }
  `,
};

const StyledEditBtn = styled(Button)`
  && {
    width: 70px;
    height: 25px;
    border-radius: 5px;
    font-size: 12px;
    line-height: normal;
  }
`;

const StyledActionBtn = styled(Button)`
  && {
    width: 130px;
    height: 25px;
    border-radius: 5px;
    font-size: 12px;
    line-height: normal;
  }
`;

export default SelectBar;
