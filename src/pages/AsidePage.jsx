import {
  Stack,
  Image,
  Box,
  Title,
  UnstyledButton,
  Paper,
  Group,
  Text,
} from "@mantine/core";

import DropDown from "../components/DropDown.jsx";
import MembersList from "../components/MembersList.jsx";
import PhotoList from "../components/grid/PhotoList.jsx";
import VideoGrid from "../components/VideoGrid.jsx";
import LinkList from "../components/LinkList.jsx";
import DocumentList from "../components/DocumentList.jsx";
import Gallery from "../components/grid/Gallery.jsx";

import IconManyPeople from "../assets/icons/IconManyPeople.svg";
import IconImage from "../assets/icons/input/IconImage.svg";
import IconVideoCamera from "../assets/icons/dropdown/IconVideoCamera.svg";
import IconLink from "../assets/icons/dropdown/IconLink.svg";
import IconDocument from "../assets/icons/dropdown/IconDocument.svg";
import IconLeave from "../assets/icons/buttons/IconLeave.svg";

import { useDialogStore } from "../store/dialog.js";
import { useAuthenticationStore } from "../store/authentication.js";
import { useChatStore } from "../store/chat.js";
import { useShallow } from "zustand/shallow";
import { useMemo } from "react";

const dropdownFormat = [
  {
    icon: IconManyPeople,
    label: "Members",
    dataKey: "members",
  },
  {
    icon: IconImage,
    label: "Photos",
    dataKey: "images",
  },
  {
    icon: IconVideoCamera,
    label: "Videos",
    dataKey: "videos",
  },
  {
    icon: IconLink,
    label: "Links",
    dataKey: "links",
  },
  {
    icon: IconDocument,
    label: "Documents",
    dataKey: "documents",
  },
];

export default function AsidePage() {
  const loggedUser = useAuthenticationStore((state) => state.user.data);
  const toggleChatModalFn = useDialogStore((state) => state.toggleChatModal);
  const { chat } = useChatStore(
    useShallow((state) => ({
      chat: state.chat,
    }))
  );

  const { asideDataPage: asideData, header } = chat;

  console.log(chat);
  console.log(asideData);

  const computedDropdownInputs = useMemo(() => {
    return header.type !== ""
      ? dropdownFormat
          .filter(
            (item) => !(header.type === "private" && item.label === "Members")
          )
          .map((item) => ({
            ...item,
            data: asideData[item.dataKey],
          }))
      : null;
  }, [asideData, header]);

  const dropdownInstances = useMemo(() => {
    return computedDropdownInputs
      ? computedDropdownInputs.map((instance) => {
          let children = null;

          // console.log(instance);

          if (instance.label === "Members") {
            children = (
              <MembersList
                instance={instance.data}
                onClick={toggleChatModalFn}
              />
            );
          } else if (instance.label === "Photos") {
            children = (
              <Gallery>
                <PhotoList images={instance.data} />
              </Gallery>
            );
          } else if (instance.label === "Videos") {
            children = <VideoGrid />;
          } else if (instance.label === "Links") {
            children = <LinkList links={instance.data} />;
          } else if (instance.label === "Documents") {
            children = <DocumentList documents={instance.data} />;
          }

          return (
            <DropDown key={instance.label} {...instance}>
              {children}
            </DropDown>
          );
        })
      : null;
  }, [computedDropdownInputs, toggleChatModalFn]);

  const leaveButton = header.type === "group" && (
    <UnstyledButton>
      <Paper
        p={16}
        radius="md"
        c="red.6"
        style={{
          backgroundColor: "var(--mantine-color-red-0)",
        }}
      >
        <Group>
          <Image w={20} h={20} src={IconLeave} />
          <Text flex={1}>Leave Group</Text>
        </Group>
      </Paper>
    </UnstyledButton>
  );

  return (
    <Stack align="center" h="inherit" py={36}>
      <Box ta="center">
        <Image
          display="inline-block"
          mb={8}
          w={90}
          h={90}
          radius="sm"
          src={header.image}
        />
        <Title ta="center" order={3}>
          {header.name}
        </Title>
      </Box>

      <Stack w="100%" gap={8}>
        {dropdownInstances}
        {leaveButton}
      </Stack>
    </Stack>
  );
}
