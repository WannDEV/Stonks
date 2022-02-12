import boom from "@hapi/boom";

import PendingStock from "../../db/models/pendingStock";

const cancelStock = async function (req, res, next) {
  const pendingStockId = req.body.pendingStockId;

  const pendingStock = await PendingStock.findOne({
    _id: pendingStockId,
  }).catch((err) => {
    return next(boom.badImplementation(`Database error: ${err}`));
  });

  if (pendingStock) {
    if (!pendingStock.is_cancelled) {
      const now = new Date();
      const delayedDate = new Date(now.getTime() + 20 * 60000); // add 20 minute delay

      // not enough time to cancel stock
      if (now > pendingStock.active_from) {
        return res
          .status(200)
          .json({ message: "not enough time to cancel stock" });
      } else {
        // enough time to cancel stock
        pendingStock.is_cancelled = true;
        pendingStock.cancellation_at = delayedDate;
        await pendingStock.save();

        return res.status(200).json({ message: "success" });
      }
    } else {
      return next(boom.badRequest("Stock is already cancelled"));
    }
  } else {
    return next(boom.badRequest("Could not find stock"));
  }
};

export default cancelStock;
