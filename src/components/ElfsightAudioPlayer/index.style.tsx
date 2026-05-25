import styled from 'styled-components';

export const Wrap = styled.div<{ $variant: 'visible' | 'hidden' }>`
  position: relative;
  width: 100%;
  min-height: ${({ $variant }) => ($variant === 'visible' ? '88px' : '1px')};

  ${({ $variant }) =>
    $variant === 'hidden' &&
    `
    position: fixed;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
    pointer-events: none;
    opacity: 0;
  `}

  & > div {
    width: 100% !important;
    max-width: 100% !important;
  }

  iframe {
    border-radius: ${({ theme }) => theme.radius.sm} !important;
  }
`;
