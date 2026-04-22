import { useRef, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

import {
  createEmojis,
  updateEmojis,
} from '../../../../../../services/EmojiService';

import styles from '../../EmojiContainer.module.css';
import smileIcon from '../../../../../../assets/icons/ic_smile.svg';

const EmojiAdd = ({ emojis, setEmojis, id, updateEmoji, toastHandler }) => {
  const [isOpen, setIsOpen] = useState(false);
  const emojiRef = useRef(null);

  const emojiHandle = async (e) => {
    // emoji 가 현재 emoji 안에 있는 지 확인
    // 있으면 patch 로 넘기고
    // 없으면 create 로 넘기자!
    const selectEmoji = emojis.find((emoji) => emoji.emoji === e.emoji);

    if (!selectEmoji && emojiRef.current !== e.emoji) {
      emojiRef.current = e.emoji;
      //create
      const newEmoji = await createEmojis(id, e.emoji);

      setEmojis((prev) => [...prev, newEmoji]);
    } else if (!selectEmoji && emojiRef.current === e.emoji) {
      toastHandler(
        'error',
        '이모지 등록중입니다! 잠시 후 다시 시도해주세요!',
        'emoji',
      );
    } else {
      //update emoji id 같이
      updateEmoji(selectEmoji.id);
    }
  };

  return (
    <div className={styles.emojiPickerWrapper}>
      <button className={styles.emojiAddBtn} onClick={() => setIsOpen(!isOpen)}>
        <img src={smileIcon} alt="이모지 추가 버튼" />
        <span>추가</span>
      </button>
      {isOpen && (
        <div className={styles.emojiPickerBox}>
          <EmojiPicker onEmojiClick={(e) => emojiHandle(e)} />
        </div>
      )}
    </div>
  );
};

export default EmojiAdd;
