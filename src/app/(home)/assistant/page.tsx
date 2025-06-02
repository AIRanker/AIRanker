import AssistantContent from "~/app/(home)/assistant/_components/assistant-content"
import AssistantProvider from "~/app/(home)/assistant/assistant-provider"
import { AssistantModal } from "~/components/assistant-modal"

const AssistantPage = () => {
  return (
    <AssistantProvider>
      <AssistantModal />
      <AssistantContent />
    </AssistantProvider>
  )
}

export default AssistantPage
