import { useState } from 'react';
import styles from './BackGround.module.css';

import img1 from '../../../../assets/images/background_green.png';
import img2 from '../../../../assets/images/background_yellow.png';
import img3 from '../../../../assets/images/background_blue.png';
import img4 from '../../../../assets/images/background_pink.png';
import img5 from '../../../../assets/images/img5.png';
import img6 from '../../../../assets/images/img6.png';
import img7 from '../../../../assets/images/img7.png';
import img8 from '../../../../assets/images/img8.png';
import checkimg from '../../../../assets/icons/ic_bg_check.svg';

const images = [
  { id: 'green', src: img1 },
  { id: 'yellow', src: img2 },
  { id: 'blue', src: img3 },
  { id: 'pink', src: img4 },
  { id: 'bg5', src: img5 },
  { id: 'bg6', src: img6 },
  { id: 'bg7', src: img7 },
  { id: 'bg8', src: img8 },
];

const BackGround = ({ setBackground }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClick = (img) => {
    setSelectedImage(img.id);
    setBackground(img.id);
  };

  return (
    <div className={styles.grid}>
      {images.map((img) => (
        <div
          key={img.id}
          className={`${styles.card} ${selectedImage === img.id ? styles.active : ''}`}
          onClick={() => handleClick(img)}
        >
          <div className={styles.imgWrapper}>
            <img src={img.src} alt={img.id} />
          </div>

          {selectedImage === img.id && (
            <div className={styles.checkIcon}>
              <img src={checkimg} alt="check" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BackGround;
