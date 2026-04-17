import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';
import Emoji from '../../../components/Emoji/Emoji';
import TotalPoint from '../../../components/TotalPoint/TotalPoint';
import { getEmojis } from '../../../services/StudyDetailService';
import { saveRecentStudy } from '../../../services/StudyService';
import {
  getStudyBackgroundColor,
  getStudyBackgroundImage,
  getStudyNicknameColor,
  isImageBackground,
} from './studyBackground';

const Card = ({ study }) => {
  const [topEmojis, setTopEmojis] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchTopEmojis = async () => {
      try {
        const emojis = await getEmojis(study.id);
        const nextTopEmojis = (emojis ?? [])
          .slice()
          .sort((a, b) => (b.count ?? 0) - (a.count ?? 0))
          .slice(0, 3);

        if (isMounted) {
          setTopEmojis(nextTopEmojis);
        }
      } catch (error) {
        console.error(error);

        if (isMounted) {
          setTopEmojis([]);
        }
      }
    };

    fetchTopEmojis();

    return () => {
      isMounted = false;
    };
  }, [study.id]);

  const background = study.background;
  const hasImageBackground = isImageBackground(background);

  //단일색일 경우 색상값 / 이미지일 경우 경로
  const cardStyle = hasImageBackground
    ? { backgroundImage: `url(${getStudyBackgroundImage(background)})` }
    : { backgroundColor: getStudyBackgroundColor(background) };

  //css 모듈 클래스 명(오버레이)
  const backgroundClassName = hasImageBackground
    ? styles.imageBackground
    : styles.solidBackground;

  // 배경에 따른 텍스트 색상 css 설정
  const textThemeClassName = hasImageBackground
    ? styles.lightTextTheme
    : styles.darkTextTheme;

  //배경에 따른 총 획득 포인트 테마 설정
  const pointTheme = hasImageBackground ? 'dark' : undefined;
  const nicknameStyle = hasImageBackground
    ? undefined
    : { color: getStudyNicknameColor(background) };

  const cardClassName = `${styles.cardBackground} ${backgroundClassName} ${textThemeClassName}`;

  const handleCardClick = () => {
    saveRecentStudy(study);
  };

  return (
    <Link
      to={`/${study.id}/detail`}
      className={styles.cardLink}
      onClick={handleCardClick}
    >
      <article className={cardClassName} style={cardStyle}>
        <div className={styles.cardInner}>
        {/* 카드 타이틀 + 포인트 */}
          <div className={styles.titleDate}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>
                <span className={styles.nickname} style={nicknameStyle}>
                  {study.nickname}
              </span>
                의 {study.title}
              </h3>
            {/* 획득 포인트 연결 */}
              <TotalPoint id={study.id} theme={pointTheme} />
            </div>

          {/* N일째 진행 중 */}
            <p className={styles.cardProgressText}>{study.progressText}</p>
          </div>

        {/* 스터디 설명 */}
          <p className={styles.cardDescription}>{study.description}</p>

        {/* 이모지 */}
          <div className={styles.cardEmojiTagDiv}>
            {topEmojis.map((emoji) => (
              <Emoji
                key={emoji.id}
                emoji={emoji.emoji}
                count={emoji.count}
              />
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default Card;
