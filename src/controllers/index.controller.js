// src/controllers/indexController.js
export const getIndex = (req, res) => {
    res.render('index', { user: req.user || null });
    console.log('User:', req.user); // Agrega esto para depuración

};
