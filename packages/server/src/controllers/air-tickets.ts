import { createRouter, response, catchError } from "ww-utils-server/src";
import * as airTickets from "../services/air-tickets";

const router = createRouter();

router.get(
  "/",
  catchError(async (req, res, next) => {
    const tocken = await airTickets.crawlSingleLine("SHE", "SWA", "2021-01-30");
    response.json(res, tocken);
  })
);

export default router;
