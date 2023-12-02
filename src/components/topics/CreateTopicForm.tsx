"use client"

import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react"
import * as actions from "@/actions"
import { useFormState } from "react-dom"
import FormButton from "../FormButton"

function CreateTopicForm() {
  const [formState, action] = useFormState(actions.createTopic, { errors: {} })

  return (
    <Popover placement="left-start">
      <PopoverTrigger>
        <Button color="primary">Create Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-96">
            <h3 className="text-lg">Create Topic</h3>
            <Input
              label="Name"
              labelPlacement="outside"
              placeholder="Name"
              name="name"
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(", ")}
            />
            <Textarea
              label="Description"
              labelPlacement="outside"
              placeholder="Describe your topic"
              name="description"
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description}
            />

            {formState.errors._form && (
              <p className="bg-pink-100 text-pink-600 rounded-lg p-2">
                {formState.errors._form?.join(", ")}
              </p>
            )}
            <FormButton>Save</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
}

export default CreateTopicForm
