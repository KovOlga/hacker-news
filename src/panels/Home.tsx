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
  Avatar,
  Div,
  Card,
  Spacing,
  Text,
} from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { newsApi } from "../services/api";
import { convertTimeStampToDate } from "../utils/utils";
import { Icon28User } from "@vkontakte/icons";

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
              <Div key={item.id}>
                <Card mode="outline">
                  <RichCell
                    before={<Avatar fallbackIcon={<Icon28User />} />}
                    caption={`Дата: ${
                      item && item.time && convertTimeStampToDate(item.time)
                    }`}
                    text={<Title level="3">item.by</Title>}
                    afterCaption={
                      <Text weight="2">{`Рейтинг: ${item.score}`}</Text>
                    }
                  >
                    <Link
                      onClick={() => routeNavigator.push(`news/${item.id}`)}
                    >
                      <Title level="2">{item.title}</Title>
                    </Link>
                  </RichCell>
                </Card>
                <Spacing size={16} />
              </Div>
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
