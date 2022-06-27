import { useToast } from "@chakra-ui/react";

export const Toasts = (title, descption, status, duration, isClosable) => {
  const toast = useToast({
    title: title,
    description: descption,
    status: status,
    duration: duration,
    isClosable: isClosable,
  });
  return toast;
};
