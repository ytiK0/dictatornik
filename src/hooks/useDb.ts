import {useContext} from "react";
import {DbContext} from "@/context";

export function useDb() {
  const db = useContext(DbContext);

  if (db == null) {
    throw new Error("Can not use hook outside of DbConnectionProvider")
  }

  return db;
}
