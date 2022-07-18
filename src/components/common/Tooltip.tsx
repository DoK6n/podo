import React from 'react';
import { Tooltip as MuiToolTip, Zoom } from '@mui/material';
import styled from 'styled-components';

interface Props {
  children: React.ReactElement<any, any>;
  tooltipTitle?: string;
}

const CustomTooltip = styled(props => <MuiToolTip classes={{ popper: props.className }} {...props} />)`
  & .MuiTooltip-tooltip {
    background: #4d436c;
    color: #abb2bf;
    & .MuiTooltip-arrow {
      color: rgb(77, 67, 108);
    }
  }
`;

function Tooltip({ children, tooltipTitle }: Props) {
  return (
    <CustomTooltip
      title={tooltipTitle ? tooltipTitle : 'Description does not exist.'}
      children={children}
      TransitionComponent={Zoom}
      arrow
    />
  );
}

export default Tooltip;
