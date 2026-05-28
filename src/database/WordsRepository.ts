import type {IDBPDatabase} from "idb";
import type {DictionaryDB} from "./types.ts";
import {inplaceShuffle} from "../utils/inplaceShuffle.ts";
import {WORDS_STORE_NAME} from "./consts.ts";

export class WordsRepository {
  private readonly db: IDBPDatabase<DictionaryDB>;

  constructor(db: IDBPDatabase<DictionaryDB>) {
      this.db = db
  }

  async count() {
    return await this.db.count(WORDS_STORE_NAME)
  }

  async addNewWord(word: string, translation: string) {
    const tc = this.db.transaction(WORDS_STORE_NAME, "readwrite");
    const store = tc.objectStore(WORDS_STORE_NAME);

    const exist = !!(await store.count(word));

    if (!exist) {
      store.add({
        word,
        translation,
        score: 0
      })
    }

    await tc.done
  }

  async getFirstN(n: number, query?: string | IDBKeyRange) {
    return await this.db.getAll(WORDS_STORE_NAME, query, n)
  }

  async getRandomN(n: number) {
    const tc = this.db.transaction(WORDS_STORE_NAME);
    const store = tc.objectStore(WORDS_STORE_NAME);

    const count = await store.count()

    if (count < n) {
      throw new Error("Not enough words in dictionary")
    }

    const keys = await store.getAllKeys(WORDS_STORE_NAME);
    const sample = inplaceShuffle(keys).slice(0, n);

    const result = await Promise.all(
      sample.map((word) => store.get(word))
    )

    await tc.done

    return result
  }

  async putScore(word: string, newScore: number) {
    const wordRecord = await this.db.get(WORDS_STORE_NAME, word);

    if (!wordRecord)
      return

    wordRecord.score = newScore

    await this.db.put(WORDS_STORE_NAME, wordRecord)
  }
}