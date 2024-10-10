import { Stack, Image, Box, Title } from "@mantine/core";
import HappyImage from "../assets/HappyImage.jpg";

import DropDown from "../components/DropDown.jsx";
import MembersList from "../components/MembersList.jsx";
import PhotoGrid from "../components/PhotoGrid.jsx";
import VideoGrid from "../components/VideoGrid.jsx";
import LinkList from "../components/LinkList.jsx";
import DocumentList from "../components/DocumentList.jsx";

import IconManyPeople from "../assets/icons/IconManyPeople.svg";
import IconImage from "../assets/icons/input/IconImage.svg";
import IconVideoCamera from "../assets/icons/dropdown/IconVideoCamera.svg";
import IconLink from "../assets/icons/dropdown/IconLink.svg";
import IconDocument from "../assets/icons/dropdown/IconDocument.svg";

const dropdownData = [
  {
    icon: IconManyPeople,
    label: "Messages",
    data: [
      {
        id: 1,
        name: "Gabriel Gatbonton",
        role: "Admin",
        image:
          "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png",
      },
      {
        id: 2,
        name: "Alexander JC",
        role: "Group Member",
        image:
          "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png",
      },
    ],
  },
  {
    icon: IconImage,
    label: "Photos",
    data: [
      {
        id: 1,
        name: "Photo 1",
        image:
          "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png",
      },
      {
        id: 2,
        name: "Photo 2",
        image:
          "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png",
      },
    ],
  },
  {
    icon: IconVideoCamera,
    label: "Videos",
  },
  {
    icon: IconLink,
    label: "Links",
    data: [
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png",
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png",
    ],
  },
  {
    icon: IconDocument,
    label: "Documents",
    data: ["Sample Document 1.pdf", "Sample Document 2.docx"],
  },
];

export default function AsidePage() {
  const dropdownInstances = dropdownData.map((instance) => {
    let children = null;

    if (instance.label === "Messages") {
      children = <MembersList instance={instance.data} />;
    } else if (instance.label === "Photos") {
      children = <PhotoGrid images={instance.data} />;
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

  return (
    <Stack align="center" h="inherit" py={36}>
      <Box ta="center">
        <Image
          display="inline-block"
          mb={8}
          w={90}
          h={90}
          radius="sm"
          src={HappyImage}
        />
        <Title ta="center" order={3}>
          Malakas Group
        </Title>
      </Box>

      <Stack w="100%" gap={8}>
        {dropdownInstances}
      </Stack>
    </Stack>
  );
}
