import { useEffect, useRef } from 'react';
import { ELFSIGHT_APP_CLASS } from '../../context/ElfsightAudioContext';
import * as S from './index.style';

type ElfsightAudioPlayerProps = {
  onMount?: (element: HTMLElement | null) => void;
  /** Visible in hero panel; otherwise mounted off-screen for autoplay */
  variant?: 'visible' | 'hidden';
};

export default function ElfsightAudioPlayer({
  onMount,
  variant = 'visible',
}: ElfsightAudioPlayerProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onMount?.(wrapRef.current);
    return () => onMount?.(null);
  }, [onMount]);

  return (
    <S.Wrap ref={wrapRef} $variant={variant} aria-label="Dr Lakes audio player">
      <div className={ELFSIGHT_APP_CLASS} data-elfsight-app-lazy />
    </S.Wrap>
  );
}
