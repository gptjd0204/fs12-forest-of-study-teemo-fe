import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Emoji from '../../../../components/Emoji/Emoji';
import EmojiAdd from './EmojiPopOver/EmojiAdd/EmojiAdd';

import { updateEmojis } from '../../../../services/EmojiService';

import styles from './EmojiContainer.module.css';
import plusIcon from '../../../../assets/icons/ic_plus.svg';
import EmojiSkeleton from '../../../../components/Loading/EmojiSkeleton';

const EmojiContainer = ({ toastHandler, emojis, setEmojis, isLoading }) => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);

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
      {isLoading ? (
        <EmojiSkeleton />
      ) : (
        <>
          {emojis.slice(0, 3).map((emoji, i) => emojiContent(emoji, i))}

          {emojis.length > 3 && (
            <div>
              <button
                className={styles.emojiMoreBtn}
                onClick={() => setIsOpen(!isOpen)}
              >
                <img src={plusIcon} alt="이모지 더보기" />{' '}
                {emojis.slice(3).length}
                ..
              </button>
              {isOpen && (
                <div className={styles.emojiMoreBox}>
                  {emojis.slice(3).map((emoji, i) => emojiContent(emoji, i))}
                </div>
              )}
            </div>
          )}
        </>
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
