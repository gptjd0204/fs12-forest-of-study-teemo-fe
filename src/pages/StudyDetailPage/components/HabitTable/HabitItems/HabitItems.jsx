import stickerEmpty from '../../../../../assets/icons/ic_sticker_empty.svg';

const HabitItems = ({ datas }) => {
  return (
    <>
      {datas.map((data, d_i) => {
        return (
          <tr key={`habit-${d_i}`}>
            <th>{data.title}</th>
            {data.compeletedDays.map((complete, c_i) => {
              const count = d_i % 18;
              return (
                <td key={`complete-${c_i}`}>
                  {complete ? (
                    <img src={`/stickers/ic_sticker_${count}.svg`} alt="완료" />
                  ) : (
                    <img src={stickerEmpty} alt="완료 못함" />
                  )}
                </td>
              );
            })}
          </tr>
        );
      })}
    </>
  );
};

export default HabitItems;
