import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dropdown, DropdownButton, Nav } from 'react-bootstrap';
import { MAIN, GREYS, RED } from './variables';
import styled, { css } from 'styled-components';

export const HeaderNav = styled(Nav)`
  & .nav-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px 12px;

    & > * {
      margin-top: 8px;
    }
  }
`;

export const HeaderIcon = styled(FontAwesomeIcon)`
  color: ${({ $isActive }) => ($isActive ? MAIN.MEDIUM : GREYS.MEDIUM)};
`;

export const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.5;
  color: ${GREYS.DARKEST};
  background-color: ${GREYS.LIGHTER};
  border: 1px solid ${GREYS.LIGHT};

  ${({ selected }) =>
    selected &&
    css`
      border: 2px solid ${MAIN.MEDIUM};
    `}
`;

export const StyledBadge = styled.span`
  font-size: 12px;
  margin: 1px;
  padding: 3px 7px;
  border-radius: 3px;
  line-height: 1.3;
  color: ${GREYS.LIGHTEST};
  background-color: ${({ selected }) => (selected ? MAIN.LIGHT : GREYS.MEDIUM)};
`;

export const HomeNextButton = styled(Button)`
  color: ${GREYS.DARKEST};
  background-color: ${GREYS.LIGHTEST};
  border: 1px solid ${GREYS.LIGHT};
  border-radius: 5px;
  &:hover {
    background-color: ${MAIN.MEDIUM};
  }
`;

export const HomeCategoryButton = styled(DropdownButton)`
  color: ${GREYS.DARKEST};
  background-color: ${GREYS.LIGHTEST};
  border: 1px solid ${GREYS.LIGHT};
  &:hover {
    background-color: ${MAIN.MEDIUM};
  }
`;

export const DeleteButton = styled(Button)`
  color: ${GREYS.LIGHTEST};
  background-color: ${MAIN.MEDIUM};
  border: 1px solid ${MAIN.LIGHT};
  &:hover {
    background-color: ${MAIN.LIGHT};
  }
`;

export const BackButton = styled.button`
  width: 35px;
  height: 35px;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  text-align: left;
  /* vertical-align: justify; */

  color: ${GREYS.DARKEST};
  background-color: ${GREYS.LIGHTEST};
  border: 1px solid ${GREYS.LIGHT};
  border-radius: 10px;
  &:hover {
    background-color: ${MAIN.MEDIUM};
    color: ${GREYS.LIGHTEST};
  }
`;

// TODO: (수정 필요)이것만 하면 DropdownButton 속성이 안됨
export const HomeDropdownButton = styled(DropdownButton)`
  &:hover {
    background-color: ${MAIN.MEDIUM};
  }
`;

export const HomeDropdownItem = styled(Dropdown.Item)``;

export const QuestionQ = styled.div`
  font-size: ${(props) => props.size};
  font-weight: 500;
  cursor: ${({ cursor }) => (cursor === 'pointer' ? 'pointer' : 'default')};
`;

export const QuestionTitle = styled.div`
  font-size: ${(props) => props.size};
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: 0.05rem;
  margin-bottom: ${(props) => props.mbottom || '0'};
  cursor: ${(props) => (props.cursor === 'pointer' ? 'pointer' : 'default')};
`;
// export const QuestionTitle = styled.div.attrs((props) => ({
//   size: props.size || '1rem', // 기본값 설정
//   cursor: props.cursor || 'default', // 기본값 설정
//   mbottom: props.mbottom || '0',
// }))`
//   font-size: ${(props) => props.size};
//   font-weight: 500;
//   line-height: 1.2;
//   letter-spacing: 0.05rem;
//   margin-bottom: ${(props) => props.mbottom};
//   cursor: ${(props) => props.cursor};
// `;

// export const QuestionTitle = styled.div`
//   font-size: ${(props) => props.size};
//   font-weight: 500;
//   line-height: 1.2;
//   letter-spacing: 0.05rem;
//   ${(props) =>
//     props.mbottom &&
//     css`
//       margin-bottom: ${props.mbottom};
//     `}
//   ${(props) =>
//     props.cursor &&
//     css`
//       cursor: ${props.cursor};
//     `}
// `;

export const SearchLi = styled.li`
  list-style: none;
  padding: 10px;
  border-radius: 5px;
  color: ${GREYS.DARKER};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${MAIN.LIGHT};
  }
`;

export const MenuNavLink = styled(Nav.Link)`
  &:hover {
    color: ${GREYS.DARK};
  }
`;

export const ErrorMessage = styled.p`
  padding-top: 4px;
  font-size: 14px;
  color: ${RED};
`;

export const StyledTd = styled.td`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: ${(props) => props.maxWidth};
`;

// #F7F6F7 -> 밝은 회색 (조금 어두운 흰색정도?)(Header, Footer)
// 아이콘 선택 안되었을때 #B3B3B5 -> 조금 어두운 회색
// 더 어두운 회색 ${GREYS.DARK}
// 진한 회색 ${GREYS.DARKER}

// 선택되었을때 밝은 파랑: ${MAIN.LIGHT}
// 선택되었을때 파란색 ${MAIN.MEDIUM}
// 진한 파랑 : #2f93ea

// 글자색 검정: ${GREYS.DARKEST} 흰색: #f0f4f5
// 등록 글자 회삭: #1e235a66
