import styled from 'styled-components';
import styledTS from 'styled-components-ts';
import { colors, dimensions } from '../../styles';
import { darken, rgba } from '../../styles/ecolor';

const Container = styled.div`
  display: flex;
  min-height: 100%;
  flex: 1;
  justify-content: start;
  align-items: center;
  padding: ${dimensions.coreSpacing}px ${dimensions.coreSpacing * 2}px;
  background: ${colors.colorWhite};
  flex-direction: column;

  h2 {
    margin: 0px 0 ${dimensions.unitSpacing}px;
    font-weight: 700;
    text-align: center;
  }

  > p {
    font-size: 16px;
    text-align: center;
    color: ${colors.colorCoreGray};
    max-width: 65%;

    @media (max-width: 1170px) {
      max-width: 100%;
    }
  }
`;

const Items = styledTS<{ vertical?: boolean }>(styled.div)`
	display: flex;
	flex-wrap: wrap;
	flex-direction: ${(props) => (props.vertical ? 'column' : 'row')};
`;


const ItemsSteps = styledTS<{ vertical?: boolean }>(styled.div)`
	display: flex;
	flex-wrap: wrap;
	flex-direction: ${(props) => (props.vertical ? 'column' : 'row')};
`;

const Action = styled.div`
  margin-top: auto;
  width: 100%;
  button,
  a {
 
    &:active,
    &:focus {
      box-shadow: none;
    }
  }
`;
const ActionWrap = styled.div`
  margin-top: auto;
  width: 100%;
  display: flex;
  justify-content: center; 
  align-items: center;

  button {
    background-color: transparent;
    color: ${colors.colorPrimary};
    display: flex; 
    justify-content: start; 
    align-items: center;
	icon-align:left;
	iconLeftAlignment: left;
`;


const ItemsCintainer = styled.div`
  &  > div {
 background: ${colors.updatedBgColor}

  }
`;
const ItemContent = styledTS<{
  color: string;
  vertical?: boolean;
  max?: string;
}>(styled.div)`
	// background: ${(props) => rgba(props.color, 0.2)};
	background:transparent;
	padding: 20px 25px;
	border-radius: 12px;
	margin: 10px;
	min-width: 250px;
	max-width: ${(props) => (props.vertical ? '420px' : props.max)};
	flex: 1;
	display: flex;
	flex-direction: column;
	box-shadow:0px 0px 10px 1px #99999950; 
	align-items: flex-start;
	border: 1px solid transparent;
	position: relative;
	transition: background 0.3s ease;
   text-align: center;
	h4 {
		width:100%;
		text-align: center;
		margin: ${dimensions.coreSpacing}px 0 ${dimensions.unitSpacing}px;
		font-size: 16px;
		font-weight: 700;
		line-height: 20px;
		color: ${colors.newPrimaryColor}
	}
    .icon-box-section {
		width: 100%;
		margin: 0 auto;
		display:flex;
		justify-content: center;
	}
	${Action} > button,${Action} > button > a, ${Action} > a {
		background: #f1b500 ;
		color:  black ;
		text-decoration: none !important;
		
	}

	p {
		margin: 0 0 20px;
	}

	strong {
		font-weight: 600;
	}

	ul {
		padding-inline-start: ${dimensions.coreSpacing}px;
		margin: 0;

		li {
			margin-bottom: 5px;

			&:last-child {
				margin: 0;
			}
		}
	}
	
	> .icon-box-section i {
		line-height: 32px;
		background: ${colors.colorWhite};
		width: 32px;
		text-align: center;
		box-shadow: 0 0 6px 1px rgba(0,0,0,0.08);
		border-radius: 16px;
		font-weight: 800;
		display: block;
		font-style: normal;
	}

	&:hover {
		// background: ${(props) => rgba(props.color, 0.3)};
		// border-color: ${(props) => props.color};
	}
`;

export { Action, Container, ItemContent, Items,ItemsCintainer, ItemsSteps, ActionWrap };
