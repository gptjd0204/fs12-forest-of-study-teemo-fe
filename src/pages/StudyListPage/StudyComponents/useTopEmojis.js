import { useEffect, useState } from 'react';
import { getEmojis } from '../../../services/EmojiService';

const useTopEmojis = (studyId) => {
  const [topEmojis, setTopEmojis] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchTopEmojis = async () => {
      try {
        const emojis = await getEmojis(studyId);
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
  }, [studyId]);

  return topEmojis;
};

export default useTopEmojis;
