import styled from 'styled-components';
import { colors } from '../../../styles';

const EditorToolbarWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #d1d5db;
  background-color: ${colors.colorWhite};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 0.375rem;

  .Select-control {
    width: 100px;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    padding: 0.25rem;
    background-color: ${colors.colorWhite};
    color: #374151;
  }

  & div,
  & span {
    color: #374151;
  }
`;

export { EditorToolbarWrapper };
