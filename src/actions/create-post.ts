"use server"

import { auth } from "@/auth"
import { z } from "zod"
import { Post } from "@prisma/client"
import { db } from "@/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import paths from "@/paths"

interface CreateTopicFormProps {
  errors: {
    title?: string[]
    content?: string[]
    _form?: string[]
  }
}

const createPostSchema = z.object({
  title: z.string().min(5),
  content: z.string().min(10),
})

export const createPost = async (
  slug: string,
  formState: CreateTopicFormProps,
  formData: FormData
): Promise<CreateTopicFormProps> => {
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  })
  if (!result.success)
    return {
      errors: result.error.flatten().fieldErrors,
    }

  const session = await auth()
  if (!session || !session.user)
    return { errors: { _form: ["You must be signed in to do this"] } }

  const topic = await db.topic.findFirst({
    where: { slug },
  })
  if (!topic) return { errors: { _form: ["Cannot find topic"] } }

  let post: Post
  try {
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId: topic.id,
      },
    })
  } catch (err: unknown) {
    if (err instanceof Error) return { errors: { _form: [err.message] } }
    else return { errors: { _form: ["Something went wrong"] } }
  }
  revalidatePath(paths.topicShow(slug))
  redirect(paths.postShow(slug, post.id))

  return {
    errors: {},
  }
}
