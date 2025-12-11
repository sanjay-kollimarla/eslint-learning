const healthController = {
    check: async(_, res) => res.status(200).send({success: true}),
};

module.exports = healthController;