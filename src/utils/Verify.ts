import { cid } from "is-ipfs";

export const isCid = (value: string) => cid(value);