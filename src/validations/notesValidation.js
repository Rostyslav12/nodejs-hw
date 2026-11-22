
import { isValidObjectId } from 'mongoose';
import { Joi, Segments } from 'celebrate';

import { TAGS } from '../constants/tags.js';

// GET /notes
export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),

    perPage: Joi.number().integer().min(5).max(20).default(10),

    tag: Joi.string().valid(...TAGS),

    search: Joi.string().allow(''),
  }),
};

// GET /notes/:noteId
// DELETE /notes/:noteId
export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string()
      .custom((value, helpers) => {
        if (!isValidObjectId(value)) {
          return helpers.error('any.invalid');
        }

        return value;
      })
      .required(),
  }),
};

// POST /notes
export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().trim().min(1).required(),

    content: Joi.string().allow(''),

    tag: Joi.string().valid(...TAGS),
  }),
};

// PATCH /notes/:noteId
export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string()
      .custom((value, helpers) => {
        if (!isValidObjectId(value)) {
          return helpers.error('any.invalid');
        }

        return value;
      })
      .required(),
  }),

  [Segments.BODY]: Joi.object({
    title: Joi.string().trim().min(1),

    content: Joi.string().allow(''),

    tag: Joi.string().valid(...TAGS),
  }).min(1),
};
