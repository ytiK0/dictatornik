import {openDB} from "idb";
import type {DictionaryDB} from "./types.ts";
import {DB_NAME} from "./consts.ts";

export async function openDb() {
  return await openDB<DictionaryDB>(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore("words", {keyPath: "word"})
    }
  });
}