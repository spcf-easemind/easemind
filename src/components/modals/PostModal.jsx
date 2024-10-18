import {
  Flex,
  Modal,
  ScrollArea,
  UnstyledButton,
  Image,
  Group,
} from "@mantine/core";

import PostSection from "../posts/PostSection";
import UserProfileIndicator from "../UserProfileIndicator";
import ActionsBox from "../ActionsBox";

import IconPostOption from "../../assets/icons/buttons/IconPostOption.svg";

const isModal = true;

export default function PostView({
  userProfileImage,
  userName,
  userRole,
  openModal,
  closeModal,
  options,
  sample,
  profileIndicatorStyling,
}) {
  return (
    <Modal
      centered
      padding="xl"
      radius={10}
      size="55rem"
      opened={openModal}
      onClose={closeModal}
      withCloseButton={false}
      scrollAreaComponent={ScrollArea.Autosize}
      overlayProps={{
        backgroundOpacity: 0.5,
        blur: 5,
      }}
      styles={{ header: { width: '100%', display: 'flex' } }}
      title={
        <Group align="space-between">
          <UserProfileIndicator
            {...profileIndicatorStyling}
            profile={userProfileImage}
            name={userName}
            role={userRole}
          />
          <Flex align="flex-start">
            <ActionsBox options={options}>
              <UnstyledButton>
                <Image src={IconPostOption} />
              </UnstyledButton>
            </ActionsBox>
          </Flex>
        </Group>
      }
    >
      <PostSection {...sample} options={options} isModal={isModal} />
    </Modal>
  );
}
