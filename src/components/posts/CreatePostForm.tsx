"use client"

import {
  Button,
  Input,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react"
import * as actions from "@/actions"
import FormButton from "../FormButton"
import { useFormState } from "react-dom"

interface CreatePostFormProps {
  slug: string
}

function CreatePostForm({ slug }: CreatePostFormProps) {
  const [formState, action] = useFormState(
    actions.createPost.bind(null, slug),
    { errors: {} }
  )
  return (
    <Popover placement="left-start">
      <PopoverTrigger>
        <Button color="primary">Create post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-96">
            <h3 className="text-lg">Create Post</h3>
            <Input
              name="title"
              labelPlacement="outside"
              label="Title"
              placeholder="Title"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(", ")}
            />
            <Textarea
              name="content"
              labelPlacement="outside"
              label="Content"
              placeholder="Content"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(", ")}
            />

            {formState.errors._form && (
              <p className="bg-pink-100 text-pink-600 rounded-lg p-2">
                {formState.errors._form?.join(", ")}
              </p>
            )}
            <FormButton>Create post</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
}

export default CreatePostForm
