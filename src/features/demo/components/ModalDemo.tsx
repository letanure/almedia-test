import { Stack } from "@/components/custom-ui/Stack"
import { Text } from "@/components/custom-ui/Text"
import { Button } from "@/components/ui/button"
import { useModal } from "@/contexts/ModalContext"
import { useToast } from "@/contexts/ToastContext"
import { BasicModalContent } from "./BasicModalContent"
import { UserFormContent } from "./UserFormContent"

export function ModalDemo() {
  const modal = useModal()
  const toast = useToast()

  const handleBasicModal = () => {
    modal.open("basic", <BasicModalContent />, {
      title: "Basic Modal",
      size: "md",
    })
  }

  const handleFormModal = () => {
    modal.openForm(
      "user-form",
      <UserFormContent
        onSubmit={(data) => {
          modal.close("user-form")
          toast.success({
            message: `User "${data.username}" (${data.email}) created successfully!`,
          })
        }}
        onCancel={() => modal.close("user-form")}
      />,
      {
        title: "User Form",
        size: "md",
      },
    )
  }

  const handleConfirmModal = async () => {
    const confirmed = await modal.confirmDelete({
      message: "This will permanently delete the selected item.",
    })

    if (confirmed) {
      toast.success({ message: "Item deleted successfully!" })
    }
  }

  return (
    <Stack spacing="md">
      <Text tag="p" variant="muted">
        Portal-based modals using{" "}
        <Text tag="code" variant="code">
          modal.open()
        </Text>
        ,{" "}
        <Text tag="code" variant="code">
          modal.openForm()
        </Text>
        , and{" "}
        <Text tag="code" variant="code">
          modal.confirmDelete()
        </Text>
      </Text>

      <Stack spacing="sm">
        <Button onClick={handleBasicModal} variant="secondary">
          Basic Modal
        </Button>
        <Button onClick={handleFormModal} variant="secondary">
          Form Modal
        </Button>
        <Button onClick={handleConfirmModal} variant="destructive">
          Delete Confirm
        </Button>
      </Stack>
    </Stack>
  )
}
