import { ConfigProvider, theme as antdTheme } from 'antd';
import { MotionConfig } from 'framer-motion';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/global';
import { theme } from './styles/theme';
import { ElfsightAudioProvider } from './context/ElfsightAudioContext';
import CareersPage from './pages/Careers';
import Main from './pages/Main';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <MotionConfig reducedMotion="user">
        <ElfsightAudioProvider>
          <ConfigProvider
            theme={{
              algorithm: antdTheme.darkAlgorithm,
              token: {
                colorPrimary: theme.colors.gold,
                colorInfo: theme.colors.gold,
                colorBgContainer: theme.colors.surface,
                colorText: theme.colors.white,
                colorTextSecondary: theme.colors.muted,
                colorBorder: theme.colors.border,
                colorSplit: theme.colors.border,
                borderRadius: 10,
                fontFamily: theme.fonts.body,
                fontSize: 16,
                controlHeightLG: 48,
              },
              components: {
                Button: {
                  primaryShadow: 'none',
                  defaultShadow: 'none',
                  fontWeight: 500,
                  defaultColor: theme.colors.white,
                  defaultBorderColor: theme.colors.border,
                  defaultHoverBg: 'rgba(212, 175, 55, 0.08)',
                  defaultHoverColor: theme.colors.goldBright,
                  defaultHoverBorderColor: 'rgba(212, 175, 55, 0.45)',
                },
              },
            }}
          >
            <GlobalStyle />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </ConfigProvider>
        </ElfsightAudioProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}
