import { Avatar, Div, RichCell } from "@vkontakte/vkui";
import { IComment } from "../../types/data";
import { FC } from "react";
import { convertTimeStampToDate } from "../../utils/utils";
import { Icon28User } from "@vkontakte/icons";

const SimpleComment: FC<{ comment: IComment }> = ({ comment }) => {
  return (
    <>
      <RichCell
        before={<Avatar fallbackIcon={<Icon28User />} />}
        multiline
        caption={`Дата: ${convertTimeStampToDate(comment.time)}`}
        text={comment.text}
      >
        {comment.by}
      </RichCell>
      {comment.loadedKids && (
        <Div>
          {comment.loadedKids.map((comment) => {
            return <SimpleComment comment={comment} key={comment.id} />;
          })}
        </Div>
      )}
    </>
  );
};

export default SimpleComment;
