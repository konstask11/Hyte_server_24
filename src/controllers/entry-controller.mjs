/* eslint-disable camelcase */
import {
  findEntryById,
  addEntry,
  deleteEntryById,
  updateEntryById,
  listAllEntriesById,
} from '../models/entry-model.mjs';

const getEntries = async (req, res) => {
  // return only logged in user's own entries
  // - get user's id from token (req.user.user_id)
  const result = await listAllEntriesById(req.user.user_id);
  if (!result.error) {
    res.json(result);
  } else {
    res.status(500);
    res.json(result);
  }
};

const getEntryById = async (req, res) => {
  const entry = await findEntryById(req.params.id);
  if (entry) {
    res.json(entry);
  } else {
    res.sendStatus(404);
  }
};

const postEntry = async (req, res) => {
  const {entry_date, mood, weight, sleep_hours, notes} = req.body;

  if (entry_date && (weight || mood || sleep_hours || notes)) {
    try {
      // Get user_id from the token
      const userIdFromToken = req.user.user_id;

      // Create the new diary entry with the user_id from the token..
      const newEntry = {
        user_id: userIdFromToken,
        entry_date,
        mood,
        weight,
        sleep_hours,
        notes,
      };

      // post the new diary
      const result = await addEntry(newEntry);
      if (result.entry_id) {
        return res.status(201).json({message: 'New entry added.', ...result});
      } else {
        return res.status(500).json(result);
      }
    } catch (error) {
      console.error('Error adding new entry:', error);
      return res.status(500).json({error: 'Internal server error'});
    }
  } else {
    return res.status(400).json({error: 400, message: 'Bad request'});
  }
};


const putEntry = async (req, res) => {
  const entry_id = req.params.id;
  // eslint-disable-next-line camelcase
  const {entry_date, mood, weight, sleep_hours, notes} = req.body;


  // eslint-disable-next-line camelcase
  if ((entry_date || weight || mood || sleep_hours || notes) && entry_id) {
    try {
      // get user_id
      const userIdFromToken = req.user.user_id;

      // Check if the user ID from token matches the user ID
      const entry = await findEntryById(entry_id);
      if (!entry) {
        return res.status(404).json({error: 'Entry not found'});
      }

      if (entry.user_id !== userIdFromToken) {
        return res.status(403).json({error: 'Unauthorized'});
      }

      // If the user is authorized --> update entry
      // eslint-disable-next-line camelcase
      const result = await updateEntryById({entry_id, ...req.body});
      return res.status(201).json(result);
    } catch (error) {
      console.error('Error updating entry:', error);
      return res.status(500).json({error: 'Internal server error'});
    }
  } else {
    return res.status(400).json({error: 400, message: 'Bad request'});
  }
};

const deleteEntry = async (req, res) => {
  const entryId = req.params.id;

  try {
    // Get user_id from the token
    const userIdFromToken = req.user.user_id;

    // Checks that the user has rights to delete
    const entry = await findEntryById(entryId);
    if (!entry) {
      return res.status(404).json({error: 'Entry not found'});
    }

    if (entry.user_id !== userIdFromToken) {
      return res.status(403).json({error: 'Unauthorized'});
    }

    // If the authorized --> delete
    const result = await deleteEntryById(entryId);
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.json(result);
  } catch (error) {
    console.error('Error deleting entry:', error);
    return res.status(500).json({error: 'Internal server error'});
  }
};


export {getEntries, getEntryById, postEntry, putEntry, deleteEntry};
