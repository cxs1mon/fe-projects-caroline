const { Router } = require("express");
const ueberMichRouter = Router();
const {vorstellung, reiterfahrung, pferdehaltung} = require('../../config.js');

ueberMichRouter.get('/ueber-mich', async (req, res) => {
    res.render('ueber-mich-content', {vorstellung, reiterfahrung, pferdehaltung, title: 'Kontakt'});
});

module.exports = ueberMichRouter;