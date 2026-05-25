import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
export const ELFSIGHT_APP_ID = '097f28db-10c9-4d11-b551-8d078ce4f6a6';
export const ELFSIGHT_APP_CLASS = `elfsight-app-${ELFSIGHT_APP_ID}`;

type ElfsightAudioContextValue = {
  isPlaying: boolean;
  isReady: boolean;
  togglePlayback: () => void;
  registerWidget: (element: HTMLElement | null) => void;
};

const ElfsightAudioContext = createContext<ElfsightAudioContextValue | null>(null);

function findPlaybackControl(root: HTMLElement): HTMLElement | null {
  const selectors = [
    'button[aria-label*="Pause" i]',
    'button[aria-label*="Play" i]',
    'button[title*="Pause" i]',
    'button[title*="Play" i]',
    '[role="button"][aria-label*="Pause" i]',
    '[role="button"][aria-label*="Play" i]',
    'button',
  ];

  for (const selector of selectors) {
    const control = root.querySelector(selector);
    if (control instanceof HTMLElement) {
      return control;
    }
  }

  return null;
}

function detectPlaying(root: HTMLElement) {
  return Boolean(
    root.querySelector(
      'button[aria-label*="Pause" i], [role="button"][aria-label*="Pause" i], button[title*="Pause" i]'
    )
  );
}

export function ElfsightAudioProvider({ children }: { children: ReactNode }) {
  const widgetRef = useRef<HTMLElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [widgetMounted, setWidgetMounted] = useState(false);

  const registerWidget = useCallback((element: HTMLElement | null) => {
    widgetRef.current = element;
    setWidgetMounted(Boolean(element));
  }, []);

  const syncPlayingState = useCallback(() => {
    const root = widgetRef.current;
    if (!root) return;
    setIsPlaying(detectPlaying(root));
  }, []);

  const togglePlayback = useCallback(() => {
    const root = widgetRef.current;
    if (!root) return;

    const control = findPlaybackControl(root);
    if (control) {
      control.click();
      window.setTimeout(syncPlayingState, 120);
      window.setTimeout(syncPlayingState, 400);
      return;
    }

    root.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [syncPlayingState]);

  useEffect(() => {
    const root = widgetRef.current;
    if (!root) return;

    const markReady = () => {
      if (root.querySelector('iframe, [class*="eapps"], button')) {
        setIsReady(true);
        syncPlayingState();
      }
    };

    markReady();

    const observer = new MutationObserver(() => {
      markReady();
      syncPlayingState();
    });

    observer.observe(root, { childList: true, subtree: true });

    const poll = window.setInterval(syncPlayingState, 800);

    return () => {
      observer.disconnect();
      window.clearInterval(poll);
    };
  }, [syncPlayingState, widgetMounted]);

  const value = useMemo(
    () => ({ isPlaying, isReady, togglePlayback, registerWidget }),
    [isPlaying, isReady, togglePlayback, registerWidget]
  );

  return (
    <ElfsightAudioContext.Provider value={value}>{children}</ElfsightAudioContext.Provider>
  );
}

export function useElfsightAudio() {
  const context = useContext(ElfsightAudioContext);
  if (!context) {
    throw new Error('useElfsightAudio must be used within ElfsightAudioProvider');
  }
  return context;
}
