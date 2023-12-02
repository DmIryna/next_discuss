"use client"
import * as actions from "@/actions"
import { useFormState } from "react-dom"
import { useRef, useState, useEffect } from "react"
import { Textarea, Button } from "@nextui-org/react"
import FormButton from "../FormButton"

interface CreateCommentFormProps {
  postId: string
  parentId?: string
  startOpen?: boolean
}

function CreateCommentForm({
  postId,
  parentId = "",
  startOpen,
}: CreateCommentFormProps) {
  const [open, setOpen] = useState(startOpen)
  const ref = useRef<HTMLFormElement | null>(null)
  const [formState, action] = useFormState(
    actions.createComment.bind(null, { postId, parentId }),
    { errors: {} }
  )

  useEffect(() => {
    if (formState.success) {
      ref.current?.reset()
      if (!startOpen) setOpen(false)
    }
  }, [formState, startOpen])

  return (
    <div>
      <Button size="sm" variant="light" onClick={() => setOpen(!open)}>
        Reply
      </Button>
      {open && (
        <form action={action} ref={ref}>
          <div className="space-y-2 px-1">
            <Textarea
              name="content"
              label="Reply"
              placeholder="Enter your comment"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(", ")}
            />

            {formState.errors._form && (
              <p className="bg-pink-100 text-pink-600 rounded-lg p-2">
                {formState.errors._form?.join(", ")}
              </p>
            )}

            <FormButton>Create comment</FormButton>
          </div>
        </form>
      )}
    </div>
  )
}

export default CreateCommentForm
