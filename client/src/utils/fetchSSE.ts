import { EventSourcePolyfill } from 'event-source-polyfill';

import { getAuthorityCookie } from './cookies';

export const fetchSSE = () => {
  const url = `${process.env.REACT_APP_AXIOS_BASE_URL}`;

  const eventSource = new EventSourcePolyfill(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAuthorityCookie('accessToken')}`,
      'session-id': `${getAuthorityCookie('sessionId')}`,
      'Accept-Language': `ko_KR`,
    },
  });

  eventSource.onopen = () => {
    // 연결 시 할 일
    // 테스트
  };

  eventSource.onmessage = async (e) => {
    const res = await e.data;
    const parsedData = JSON.parse(res);

    // 받아오는 data로 할 일
  };

  eventSource.onerror = (e: any) => {
    // 종료 또는 에러 발생 시 할 일
    eventSource.close();

    if (e.error) {
      // 에러 발생 시 할 일
    }

    if (e.target.readyState === EventSource.CLOSED) {
      // 종료 시 할 일
    }
  };
};

// const fetchSSE = () => {
//   fetch(url, {
//     method: 'POST',
//     headers: {
//       token: authToken,
//       'Content-Type': 'application/json; charset=utf-8',
//     },
//     body: {
//       // 생략
//     },
//   })
//     .then((response) => {
//       const reader = response.body!.getReader();
//       const decoder = new TextDecoder();

//       const readChunk = () => {
//         return reader.read().then(appendChunks);
//       };

//       const appendChunks = (result) => {
//         const chunk = decoder.decode(result.value || new Uint8Array(), {
//           stream: !result.done,
//         });
//         const parseData = JSON.parse(chunk);
//         // 받아오는 data로 할 일

//         if (!result.done) {
//           return readChunk();
//         }
//       };

//       return readChunk();
//     })
//     .then(() => {
//       // 종료 시 할 일
//     })
//     .catch((e) => {
//       // 에러 처리
//     });
// };
