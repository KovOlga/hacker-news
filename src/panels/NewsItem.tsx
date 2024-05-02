import { FC, useEffect } from "react";
import {
  Button,
  Div,
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
import { convertTimeStampToDate } from "../types/utils";

export const NewsItem: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const params = useParams<"id">();

  const {
    data: newsItem,
    error: newItemError,
    isLoading: newItemLoading,
  } = useGetNewsItemByIdQuery(8863);
  const [trigger, result] = newsApi.useLazyGetNewsItemRootCommentsQuery();
  // 8863
  // Number(params?.id)
  useEffect(() => {
    trigger(8863);
  }, []);

  const handleUpdateCommentsClick = () => {
    trigger(8863);
  };

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
        Вернуться назад
      </PanelHeader>
      {newItemLoading && <Spinner />}
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
            <Title level="2" style={{ marginBottom: 16 }}>
              {newsItem.title}
            </Title>
          </RichCell>
          <SimpleCell
            after={
              <Button
                appearance="accent"
                mode="outline"
                loading={result.isFetching}
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
      {result.isFetching && <Spinner />}
      {!result.isFetching &&
        result.data &&
        result.data.map((comment) => {
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
      {result.isError && (
        <Title level="1" style={{ marginBottom: 16 }}>
          Произошла ошибка
        </Title>
      )}
    </Panel>
  );
};
