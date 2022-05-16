# DY2BIT_Front
미리 보기 가능한 페이지: https://www.dy2bit.tk/introduce
<div style="display:flex; text-align:center;">
  <img style="display:inline-block;" width="275" alt="image" src="https://user-images.githubusercontent.com/39155520/166860600-d2812b6b-2121-4dad-a202-6207aeb36bb5.png">
  <img style="display:inline-block;" width="270" alt="image" src="https://user-images.githubusercontent.com/39155520/166860574-d1227cd7-39b5-4d12-a231-4ea38ab1ad7f.png">
    <img style="display:inline-block;" width="272" alt="image" src="https://user-images.githubusercontent.com/39155520/166860639-f30d85ef-6589-4fe4-b963-7a05a167f4d1.png">
  <img style="display:inline-block;" width="270" alt="image" src="https://user-images.githubusercontent.com/39155520/166860676-1c78ea1b-54f4-440c-90bf-9953240363e4.png">
</ div>

## 프론트 기획 스펙
### 0. 현재 가격 정보
- 현재 김프 가격, 업비트 현재가, 바이낸스 현재가, 환율을 확인할 수 있습니다.
### 1. 거래
- 목표 김프가, 주문 수량, 시크릿 키를 입력하여 서버에 요청하면 예약 주문이 생성됩니다.
- 목표 김프가, 미체결 잔고 수량, 시크릿 키를 입력하여 서버에 요청하면 생성된 예약 주문을 수정할 수 있습니다.
### 2. 현재 잔고 조회
- 업비트와 바이낸스의 현재 주문 가능한 금액, 포지션이 잡혀있는 BTC 정보를 확인할 수 있습니다.
### 3. 히스토리
- 일종의 어드민 기능으로 거래가 완료된 주문들을 확인할 수 있고 확인이 완료된 내역은 삭제할 수 있습니다.
### 4. 데일리 가격 트래킹
- 하루 단위로 김프 최소값, 최대값과 해당 시각을 확인할 수 있습니다.
### 5. 오류 검출
- 서버에서 오류가 발생되면 거래가 멈추게 되고 어플리케이션에서 오류를 확인하여 거래를 활성화 할 수 있습니다.

## 주의해야 할 로직 처리
- 조건에 맞는 김프가가 왔을 때 예약 물량을 한번에 거래하지 않고 0.03비트씩 주문 하도록 함.(한번에 호가에 쌓인 물량을 다 긁으면 수익이 줄어들기 때문에 0.03비트씩 거래함)
- 주문 가능 수량은 10프로 증거금을 계산하여 처리함(10프로 증거금은 안전한 거래를 위한 보험용)
- 여러 예약 주문의 목표가에 동시에 도달시에는 가장 가장 오래전에 만들어진 주문을 기준으로 처리함.(동시 처리X)
- 주문 오류가 발생하면 더이상 거래가 이루어지지 않도록 해야함.

## 추가 스펙
- PWA 구현
- 모바일로 웹앱 구현

## 기술스택
- Next.js
- TypeScript
- Redux Toolkit
- RTK Query
- Emotion

## 배포전략
- Server: AWS EC2
- Front: AWS Amplify
