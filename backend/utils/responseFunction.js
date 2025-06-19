export const responseFunction = (status, message, res, data = null) => {
    return res.status(status).json({ message, data });
};
