import { handleContact } from "../lib/contact.mjs";
export const GET = (request) => handleContact(request);
export const POST = (request) => handleContact(request);
