import type {DBSchema} from "idb";

interface WordRecord {
  word: string,
  translation: string,
  score: number,
  transcription?: string,
  description?: string,
  usageExample?: string,
}

export interface DictionaryDB extends DBSchema {
  words: {
    key: string,
    value: WordRecord
  },
}