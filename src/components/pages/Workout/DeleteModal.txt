import { Modal, Group, Button, Text } from "@mantine/core";

type DeleteModalProps = {
  opened: boolean;
  onClose: () => void;
  onDelete: () => void;
  name: string | undefined;
};

export const DeleteModal = ({ opened, onClose, onDelete, name }: DeleteModalProps) => {
  return (
    <Modal centered opened={opened} onClose={onClose} title="Are you sure?">
      <Text mb="md">Deleting: {name}</Text>
      <Group position="apart">
        <Button variant="default" color="teal" onClick={onClose}>
          No, go back
        </Button>
        <Button variant="light" color="red" onClick={onDelete}>
          Yes, I want to delete
        </Button>
      </Group>
    </Modal>
  );
};
