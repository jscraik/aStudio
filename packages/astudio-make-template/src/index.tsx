import "@astudio/tokens/tokens.css";
import { Stack, Text } from "@astudio/ui";
import { Icon } from "@astudio/icons";

export function MakeTemplateExample() {
  return (
    <Stack gap="md">
      <Text>aStudio Make template</Text>
      <Icon name="sparkles" size={16} />
    </Stack>
  );
}
