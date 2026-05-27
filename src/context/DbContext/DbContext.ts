import {createContext} from "react";
import type {IDBPDatabase} from "idb";
import type {DictionaryDB} from "@/database/types.ts";

export const DbContext = createContext<IDBPDatabase<DictionaryDB>|null>(null)