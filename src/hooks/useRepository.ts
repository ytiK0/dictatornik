import type {DictionaryDB} from "@/database/types.ts";
import type {IDBPDatabase} from "idb";
import {useDb} from "@/hooks/useDb.ts";

export function useRepository<T>(RepoCls: new (db: IDBPDatabase<DictionaryDB>) => T) {
  const db = useDb();

  return new RepoCls(db)
}