import { FC, useEffect, useRef } from "react";
import {
  Panel,
  PanelHeader,
  Header,
  Button,
  Group,
  NavIdProps,
  RichCell,
  Link,
  Spinner,
  Title,
  SimpleCell,
} from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { newsApi } from "../services/api";
import { convertTimeStampToDate } from "../utils/utils";

export interface HomeProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const Home: FC<HomeProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  const [trigger, newsArr] = newsApi.useLazyGetTopNewsQuery();

  const timerID = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    trigger();
    timerID.current = setInterval(() => trigger(), 60000);

    return () => clearInterval(timerID.current);
  }, []);

  const handleUpdateTopNewsClick = () => {
    clearInterval(timerID.current);
    trigger();
    timerID.current = setInterval(() => trigger(), 60000);
  };

  return (
    <Panel id={id}>
      <PanelHeader>Главная</PanelHeader>
      <Group
        header={
          <SimpleCell
            after={
              <Button
                appearance="accent"
                mode="outline"
                loading={newsArr.isFetching}
                onClick={handleUpdateTopNewsClick}
              >
                Обновить новости
              </Button>
            }
          >
            <Header>Последние новости</Header>
          </SimpleCell>
        }
      >
        {newsArr.isFetching && <Spinner />}
        {!newsArr.isFetching &&
          newsArr.data &&
          newsArr.data.map((item) => {
            return (
              <RichCell
                key={item.id}
                caption={`Дата: ${
                  item.time && convertTimeStampToDate(item.time)
                }`}
                text={item.by}
                afterCaption={`Рейтинг: ${item.score}`}
              >
                <Link onClick={() => routeNavigator.push(`news/${item.id}`)}>
                  {item.title}
                </Link>
              </RichCell>
            );
          })}
        {newsArr.isError && (
          <Title level="1" style={{ marginBottom: 16 }}>
            Произошла ошибка
          </Title>
        )}
      </Group>
    </Panel>
  );
};
