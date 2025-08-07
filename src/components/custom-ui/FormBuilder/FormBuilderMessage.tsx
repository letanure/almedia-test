import { FormMessage } from "@/components/ui/form"
import { useFormBuilderContext } from "./FormBuilder"

export function FormBuilderMessage(
  props: React.ComponentProps<typeof FormMessage>,
) {
  const { translateMessage } = useFormBuilderContext()
  return <FormMessage {...props} translateMessage={translateMessage} />
}
