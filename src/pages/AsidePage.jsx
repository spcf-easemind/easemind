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
import { useMemo } from "react";
import { useParams } from "react-router-dom";

// const asideData = {
//   type: "private",
//   members: [
//     {
//       id: "IeDexac8elb3gZ90q5s3L",
//       name: "Gabriel Alfonso",
//       role: "Admin",
//       image:
//         "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png",
//     },
//     {
//       id: "4pnFyYuxhXBGQ5lzjHpKv",
//       name: "Alexander JC",
//       role: "Group Member",
//       image:
//         "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png",
//     },
//   ],
//   images: [],
//   videos: [],
//   documents: [],
//   links: [],
// };

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
  const { chatRef } = useParams();
  const loggedUser = useAuthenticationStore((state) => state.user.data);
  const toggleChatModalFn = useDialogStore((state) => state.toggleChatModal);
  const getAsideData = useChatStore((state) => state.getAsideData);

  const asideData = getAsideData(chatRef);

  console.log(asideData);

  const computedDropdownInputs = useMemo(() => {
    return dropdownFormat
      .filter(
        (item) => !(asideData.type === "private" && item.label === "Members")
      )
      .map((item) => ({
        ...item,
        data: asideData[item.dataKey],
      }));
  }, [asideData]);

  const dropdownInstances = useMemo(() => {
    return computedDropdownInputs.map((instance) => {
      let children = null;

      if (instance.label === "Members") {
        children = (
          <MembersList instance={instance.data} onClick={toggleChatModalFn} />
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
    });
  }, [computedDropdownInputs, toggleChatModalFn]);

  const leaveButton = asideData.type === "group" && (
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
          src={asideData.header.image}
        />
        <Title ta="center" order={3}>
          {asideData.header.name}
        </Title>
      </Box>

      <Stack w="100%" gap={8}>
        {dropdownInstances}
        {leaveButton}
      </Stack>
    </Stack>
  );
}
