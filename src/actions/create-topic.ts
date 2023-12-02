"use server"

import { auth } from "@/auth"
import { z } from "zod"
import type { Topic } from "@prisma/client"
import { db } from "@/db"
import { redirect } from "next/navigation"
import paths from "@/paths"
import { revalidatePath } from "next/cache"

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: "Must be lowercase letters or dashes without spaces",
    }),
  description: z.string().min(10),
})

interface CreateTopicFormProps {
  errors: {
    name?: string[]
    description?: string[]
    _form?: string[]
  }
}

export const createTopic = async (
  formState: CreateTopicFormProps,
  formData: FormData
): Promise<CreateTopicFormProps> => {
  const result = createTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  })

  if (!result.success)
    return {
      errors: result.error.flatten().fieldErrors,
    }

  const session = await auth()
  if (!session || !session.user)
    return { errors: { _form: ["You must be signed in to do this"] } }

  let topic: Topic
  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
      },
    })
  } catch (err: unknown) {
    if (err instanceof Error) return { errors: { _form: [err.message] } }
    else return { errors: { _form: ["Something went wrong"] } }
  }

  revalidatePath("/")
  redirect(paths.topicShow(topic.slug))

  return {
    errors: {},
  }
}
