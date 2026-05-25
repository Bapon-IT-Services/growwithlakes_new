import { PauseCircleOutlined, PlayCircleOutlined, TeamOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { motion } from 'framer-motion';
import ElfsightAudioPlayer from '../../components/ElfsightAudioPlayer';
import { useElfsightAudio } from '../../context/ElfsightAudioContext';
import { links } from '../../config/links';
import { staggerHero, fadeUp } from '../../motion/variants';
import * as S from './index.style';

const waveHeights = [20, 32, 48, 26, 58, 36, 52, 24, 56, 34, 44, 22, 50, 30, 40] as const;

const chips = ['Media & hosting', 'A&R & development', 'Coaching', 'Partnerships'] as const;

export default function Hero() {
  const { isPlaying, togglePlayback, registerWidget } = useElfsightAudio();

  return (
    <S.Section id="top">
      <S.Atmosphere aria-hidden />
      <S.GlowOrb aria-hidden />
      <S.Inner>
        <S.Grid>
          <S.Content>
            <motion.div variants={staggerHero} initial="hidden" animate="show">
              <S.Title variants={fadeUp}>Grow With Lakes</S.Title>
              <S.Badge variants={fadeUp}>
                <S.BadgeDot aria-hidden />
                Powered by Dr Lakes
              </S.Badge>
              <S.Lead variants={fadeUp}>
                Where music, conversation, opportunity and growth come together
              </S.Lead>
              <S.Tagline variants={fadeUp}>
                A premium platform building a network of media, creatives, businesses and
                community — opening doors for collaboration and what comes next.
              </S.Tagline>
              <S.ChipRow variants={fadeUp} aria-label="Focus areas">
                {chips.map((label) => (
                  <S.Chip key={label}>{label}</S.Chip>
                ))}
              </S.ChipRow>
              <S.ButtonRow variants={fadeUp}>
                <Space size="middle" wrap>
                  <Button
                    type="primary"
                    size="large"
                    onClick={togglePlayback}
                    icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                    aria-label={isPlaying ? 'Pause Dr Lakes audio' : 'Play Dr Lakes audio'}
                  >
                    {isPlaying ? 'Pause' : 'Listen Now'}
                  </Button>
                  <Button size="large" href={links.workWithMe} icon={<TeamOutlined />}>
                    Work With Me
                  </Button>
                </Space>
              </S.ButtonRow>
              <motion.div variants={fadeUp}>
                <motion.div
                  aria-hidden
                  style={{ marginTop: '2.25rem', transformOrigin: '50% 50%' }}
                  animate={{ opacity: [0.35, 0.8, 0.35], scaleX: [0.88, 1, 0.88] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <S.Divider />
                </motion.div>
              </motion.div>
            </motion.div>
          </S.Content>

          <S.VisualCol>
            <S.OrbitAnchor aria-hidden>
              <S.OrbitRing
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
              />
            </S.OrbitAnchor>
            <S.OrbitAnchorInner aria-hidden>
              <S.OrbitRingDashed
                animate={{ rotate: -360 }}
                transition={{ duration: 95, repeat: Infinity, ease: 'linear' }}
              />
            </S.OrbitAnchorInner>
            <S.VisualPanel
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <S.VisualTop>
                <S.VisualLabel>Signal</S.VisualLabel>
                <S.VisualStatus>Live energy</S.VisualStatus>
              </S.VisualTop>
              <S.ElfsightSlot>
                <ElfsightAudioPlayer variant="visible" onMount={registerWidget} />
              </S.ElfsightSlot>
              <S.WaveWrap aria-hidden>
                {waveHeights.map((h, i) => (
                  <S.WaveBar
                    key={i}
                    style={{ height: h }}
                    animate={{
                      scaleY: isPlaying ? [0.28, 1, 0.42, 0.95, 0.28] : 0.35,
                    }}
                    transition={{
                      duration: 0.9 + i * 0.04,
                      repeat: isPlaying ? Infinity : 0,
                      ease: 'easeInOut',
                      delay: i * 0.06,
                    }}
                  />
                ))}
              </S.WaveWrap>
              <S.VisualFoot>
                <S.VisualFootText>
                  Culture-first storytelling, studio polish, and room for what&apos;s next.
                </S.VisualFootText>
                <S.VisualAccent aria-hidden>✦</S.VisualAccent>
              </S.VisualFoot>
            </S.VisualPanel>
          </S.VisualCol>
        </S.Grid>
      </S.Inner>
    </S.Section>
  );
}
