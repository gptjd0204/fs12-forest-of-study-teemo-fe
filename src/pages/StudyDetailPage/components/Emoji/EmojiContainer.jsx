import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Emoji from '../../../../components/Emoji/Emoji';
import EmojiAdd from './EmojiPopOver/EmojiAdd/EmojiAdd';

import { getEmojis, updateEmojis } from '../../../../services/EmojiService';

import styles from './EmojiContainer.module.css';
import plusIcon from '../../../../assets/icons/ic_plus.svg';

const EmojiContainer = ({ toastHandler }) => {
  const { id } = useParams();
  const [emojis, setEmojis] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const fetchEmojis = async () => {
    try {
      const data = await getEmojis(id);

      setEmojis(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    fetchEmojis();
  }, []);

  const emojiContent = (emoji, i) => (
    <Emoji
      key={`emoji-${i}`}
      size={'lg'}
      emoji={emoji.emoji}
      count={emoji.count}
      onClick={() => updateEmoji(emoji.id)}
    />
  );

  const updateEmoji = async (emojiId) => {
    const updateEmoji = await updateEmojis(id, emojiId);

    setEmojis((prev) =>
      prev.map((p) => (p.emoji !== updateEmoji.emoji ? p : updateEmoji)),
    );
  };

  return (
    <div className={styles.emojiWrapper}>
      {emojis.slice(0, 3).map((emoji, i) => emojiContent(emoji, i))}

      {emojis.length > 3 && (
        <div>
          <button
            className={styles.emojiMoreBtn}
            onClick={() => setIsOpen(!isOpen)}
          >
            <img src={plusIcon} alt="이모지 더보기" /> {emojis.slice(3).length}
            ..
          </button>
          {isOpen && (
            <div className={styles.emojiMoreBox}>
              {emojis.slice(3).map((emoji, i) => emojiContent(emoji, i))}
            </div>
          )}
        </div>
      )}

      <EmojiAdd
        toastHandler={toastHandler}
        emojis={emojis}
        setEmojis={setEmojis}
        updateEmoji={updateEmoji}
        id={id}
      />
    </div>
  );
};

export default EmojiContainer;
