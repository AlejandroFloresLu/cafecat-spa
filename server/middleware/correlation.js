export function correlation(req, res, next) {
  const cid = req.headers["x-correlation-id"] || "cid-" + Math.random().toString(36).slice(2);
  res.setHeader("x-correlation-id", cid);
  req.correlationId = cid;
  next();
}