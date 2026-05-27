import type {PropsWithChildren} from "react";
import type {IDBPDatabase} from "idb";
import type {DictionaryDB} from "@/database/types.ts";
import {DbContext} from "@/context";

interface DbConnectionProviderProps extends PropsWithChildren {
  db: IDBPDatabase<DictionaryDB>
}

export function DbProvider({
  db,
  children
}: DbConnectionProviderProps) {
  return <DbContext.Provider value={db}>
    {children}
  </DbContext.Provider>
}