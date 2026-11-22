
import createHttpError from 'http-errors';

import Note from '../models/note.js';

// GET /notes
export const getAllNotes = async (req, res, next) => {
  try {
    const {
      page = 1,
      perPage = 10,
      tag,
      search = '',
    } = req.query;

    const filter = {};

    // Фільтрація за тегом
    if (tag) {
      filter.tag = tag;
    }

    // Текстовий пошук
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    // Загальна кількість нотаток після фільтрації
    const totalNotes = await Note.countDocuments(filter);

    // Загальна кількість сторінок
    const totalPages = Math.ceil(totalNotes / perPage);

    // Отримання нотаток із пагінацією
    const notes = await Note.find(filter)
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      page,
      perPage,
      totalNotes,
      totalPages,
      notes,
    });
  } catch (error) {
    next(error);
  }
};

// GET /notes/:noteId
export const getNoteById = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    const note = await Note.findById(noteId);

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json({ note });
  } catch (error) {
    next(error);
  }
};

// POST /notes
export const createNote = async (req, res, next) => {
  try {
    const note = await Note.create(req.body);

    res.status(201).json({ note });
  } catch (error) {
    next(error);
  }
};

// PATCH /notes/:noteId
export const updateNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    const note = await Note.findByIdAndUpdate(
      noteId,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json({ note });
  } catch (error) {
    next(error);
  }
};

// DELETE /notes/:noteId
export const deleteNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    const note = await Note.findByIdAndDelete(noteId);

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json({ note });
  } catch (error) {
    next(error);
  }
};
