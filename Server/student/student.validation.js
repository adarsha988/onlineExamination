import Joi from "joi";

export const profileUpdateSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  // Add any other profile fields here
});

export const startExamSchema = Joi.object({
  examId: Joi.string().required(),
});

export const submitExamSchema = Joi.object({
  answers: Joi.array()
    .items(
      Joi.object({
        questionId: Joi.string().required(),
        answer: Joi.any().required(),
      })
    )
    .required(),
});

