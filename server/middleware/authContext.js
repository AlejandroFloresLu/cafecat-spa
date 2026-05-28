export function authContext(req, res, next) {
  const id = req.headers["x-user-id"];
  const rol = req.headers["x-user-role"];
  if (id) { req.user = { id: Number(id), rol: rol || "cliente" }; }
  next();
}