import test from "./controllers/test";
import airTickets from "./controllers/air-tickets";

export default {
  "/": test,
  "/api/airTickets": airTickets,
};
