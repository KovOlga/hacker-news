import { FC, useEffect } from "react";
import {
  Panel,
  PanelHeader,
  Header,
  Button,
  Group,
  Cell,
  Div,
  Avatar,
  NavIdProps,
  RichCell,
  UsersStack,
  ButtonGroup,
  Link,
  Spinner,
  Title,
} from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { useGetTopNewsQuery } from "../services/api";
import { convertTimeStampToDate } from "../types/utils";

export interface HomeProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const Home: FC<HomeProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  const { data: newsArr, error, isLoading } = useGetTopNewsQuery();

  return (
    <Panel id={id}>
      <PanelHeader>Главная</PanelHeader>
      <Group header={<Header>Последние новости</Header>}>
        {isLoading && <Spinner />}
        {newsArr &&
          newsArr.map((item) => {
            return (
              <RichCell
                key={item.id}
                caption={`Дата: ${convertTimeStampToDate(item.time)}`}
                text={item.by}
                afterCaption={`Рейтинг: ${item.score}`}
              >
                <Link onClick={() => routeNavigator.push(`news/${item.id}`)}>
                  {item.title}
                </Link>
              </RichCell>
            );
          })}
        {error && (
          <Title level="1" style={{ marginBottom: 16 }}>
            Произошла ошибка
          </Title>
        )}
      </Group>
    </Panel>
  );
};
