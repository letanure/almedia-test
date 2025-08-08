import { useTranslation } from "react-i18next"
import { Text } from "@/components/custom-ui/Text"

export function TodoEmpty() {
  const { t } = useTranslation()

  return (
    <Text tag="p" variant="muted" align="center">
      {t("todo.empty")}
    </Text>
  )
}
