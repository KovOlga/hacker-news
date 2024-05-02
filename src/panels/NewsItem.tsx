import { FC, useEffect } from "react";
import {
  Button,
  Group,
  Link,
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  RichCell,
  SimpleCell,
  Spinner,
  Title,
} from "@vkontakte/vkui";
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { newsApi, useGetNewsItemByIdQuery } from "../services/api";
import { Icon24ExternalLinkOutline } from "@vkontakte/icons";
import CommentAccordion from "../components/comment-accordion";
import SimpleComment from "../components/simple-comment";
import { convertTimeStampToDate } from "../utils/utils";

export const NewsItem: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const params = useParams<"id">();

  const { data: newsItem, error: newItemError } = useGetNewsItemByIdQuery(
    Number(params?.id)
  );
  const [trigger, rootComments] = newsApi.useLazyGetNewsItemRootCommentsQuery();

  useEffect(() => {
    trigger(Number(params?.id));
  }, []);

  const handleUpdateCommentsClick = () => {
    trigger(Number(params?.id));
  };

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
        Вернуться назад
      </PanelHeader>
      {newsItem && (
        <>
          <RichCell
            text={`Автор: ${newsItem.by}`}
            caption={`Дата: ${convertTimeStampToDate(newsItem.time)}`}
            after={
              <Link href={newsItem.url} target="_blank">
                Перейти к новости{" "}
                <Icon24ExternalLinkOutline width={16} height={16} />
              </Link>
            }
          >
            <Title level="1" style={{ marginBottom: 16 }}>
              {newsItem.title}
            </Title>
          </RichCell>
          <SimpleCell
            after={
              <Button
                appearance="accent"
                mode="outline"
                loading={rootComments.isFetching}
                onClick={handleUpdateCommentsClick}
              >
                Обновить комментарии
              </Button>
            }
          >
            {`Всего комментариев: ${newsItem.descendants}`}
          </SimpleCell>
        </>
      )}
      {newItemError && (
        <Title level="1" style={{ marginBottom: 16 }}>
          Произошла ошибка
        </Title>
      )}
      {rootComments.isFetching && <Spinner />}
      {!rootComments.isFetching &&
        rootComments.data &&
        rootComments.data.map((comment) => {
          if (!comment.kids) {
            return (
              <Group key={comment.id}>
                <SimpleComment comment={comment} />
              </Group>
            );
          } else {
            return <CommentAccordion key={comment.id} comment={comment} />;
          }
        })}
      {rootComments.isError && (
        <Title level="1" style={{ marginBottom: 16 }}>
          Произошла ошибка
        </Title>
      )}
    </Panel>
  );
};
