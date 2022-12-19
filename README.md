# Podote

> Purple + Todolist + NoteApp

[podote.com](https://podote.com)

에디터를 기반으로 문서를 작성하고 문서 전체를 하나의 할일로 관리하며 사용할 수 있는 서비스입니다.  
간단한 TodoList 기능으로도 사용할 수 있고,  
사이트 임베드, 이미지, Markdown, 표 등 다양한 기능이 있는 문서를 추가할 수 있어요.  

<br/>

## 기술 스택 및 배포
- Tech
  - Client : React, ApolloClient, Zustand, Styled-Components, Remirror, Firebase Auth
  - Server : NestJS, Prisma, ApolloServer, PostgreSQL

- Deploy
  - Client : AWS CloudFront, Route53, S3
  - Server : EC2, Nginx, Docker-compose

<br />
<br />

## ApolloClient Cache
GraphQL 라이브러리중 Apollo Client 사용할 때,
useQuery로 데이터를 가져오고 상태 관리 라이브러리로 또 추가 해주다보니 해야 할 작업이 늘어났습니다.

이를 해결하기 위해 Apollo Client의 캐싱을 사용하였습니다.
Apollo Client는 쿼리와 데이터들을 캐싱하여 클라이언트단에서 보관합니다.
또, useMutation로 데이터를 추가할때, useQuery로 추가한 데이터를 참조해야 하는 컴포넌트와 싱크를 맞추기 위해서 refetchQueries를 사용하여 해결하였습니다.

<br />
<br />

## KeyUp Event 한글 두번 입력되는 이슈
Input에 할일을 입력해 엔터로 추가하는 과정에서 두번 입력되는 이슈가 있었습니다.

onKeyDown: keycode 값, 키를 누르고 떼는 동작 자체에 반응, Enter 인식
onKeyPress: ASCII 값, 문자가 실제로 입력됐을 때 반응, Enter 인식 불가

onKeyPress를 주면 해결 되나 deprecated인 관계로 다른 방법을 모색하던 중KeyboardEvent.isComposing에 대해 알게되었습니다.
한글은 영어와 달리 한 글자가 영어보다 많은 정보를 담고있기 때문에
키를 입력한 순간부터 입력완료 까지 시간이 걸리고, 이는 keyUp/Down 이벤트가 이미 발생되고 난 후에도 진행중일 수 있다는 것을 의미하며 그 상태를 isCompsing 이란 event 객체 속성값으로 확인 할 수 있습니다. 

```js
const [isComposing, setIsComposing] = useState(false)
...
<Input>
  onCompositionStart={() => setIdComposing(true)}
  onCompositionEnd={() => setIdComposing(false)}
  onKeyUp={handleAddItem}
</Input>
```
<br />
<br />

## 상태관리 라이브러리 고민

상태관리는 Recoil과 Zustand 중에서 고민하였는데  
다음과 같은 이유로 Zustand를 선택하였습니다.

- Redux devtools를 연동해서 사용할 수 있다.
- 라이브러리 원본소스양이 적어서 문제가 생겨 원본소스를 봐야할 때 좋을 것 같아서
- 다양한 미들웨어 (로컬 스토리지, 상태 변화 구독, immer 지원 등)


<br />
<br />
<br />
<br />
<br />

> ## commit message
>
> `feat` : 기능 관련  
> `chore` : package.json( npm 모듈, npm script등 ), configuration settings 관련  
> `design` : css 관련, file(img,svg,png등) 관련 (변경 전: style)
> `format`: 단순 코드 포매팅  
> `docs` : 문서 관련  
> `refactor` : 코드 리팩토링 관련 (성능 최적화등)  
> `types`: Type 수정  
> `test` : 테스트 관련  
> `fix` : 버그 수정 관련  
> `comment` : 주석 관련
