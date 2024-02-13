// temporal mock data for testing, should be replaced with real data from DB
const diaryEntries = [
  {
    "entry_id": 5,
    "user_id": 5,
    "entry_date": "2024-01-14",
    "mood": "Relaxed",
    "weight": 75.0,
    "sleep_hours": 8,
    "notes": "Spent the day reading",
    "created_at": "2024-01-14T19:00:00"
  },
  {
    "entry_id": 4,
    "user_id": 4,
    "entry_date": "2024-01-13",
    "mood": "Energetic",
    "weight": 55.0,
    "sleep_hours": 9,
    "notes": "Went for a morning run",
    "created_at": "2024-01-13T18:00:00"
  },
  {
    "entry_id": 3,
    "user_id": 3,
    "entry_date": "2024-01-12",
    "mood": "Tired",
    "weight": 68.0,
    "sleep_hours": 6,
    "notes": "Work was demanding",
    "created_at": "2024-01-12T22:00:00"
  },
  {
    "entry_id": 2,
    "user_id": 2,
    "entry_date": "2024-01-11",
    "mood": "Satisfied",
    "weight": 65.0,
    "sleep_hours": 7,
    "notes": "Met with friends, had a good time",
    "created_at": "2024-01-11T21:00:00"
  },
  {
    "entry_id": 1,
    "user_id": 1,
    "entry_date": "2024-01-10",
    "mood": "Happy",
    "weight": 70.5,
    "sleep_hours": 8,
    "notes": "Had a great workout session",
    "created_at": "2024-01-10T20:00:00"
  }
];

const listAllEntries = () => {
  return diaryEntries;
};

const findEntryById = (id) => {
  return diaryEntries.find((item) => item.entry_id == id);
};

const addEntry = (entry) => {
  const {user_id, entry_date, mood, weight, sleep_hours, notes} = entry;
  const newId = diaryEntries[0].entry_id + 1;
  diaryEntries.unshift({entry_id: newId, entry_date, mood, weight, sleep_hours, notes, user_id});
};

export {listAllEntries, findEntryById, addEntry};
