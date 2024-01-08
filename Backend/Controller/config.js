const Configuration = require("../Models/data");

exports.getConfig = async (req, res) => {
  try {
    const { id } = req.params;
    const configuration = await Configuration.findOne({ configId: id });
    if (!configuration) {
      return res.status(404).json({ message: "Configuration not found" });
    }

    res.status(200).json(configuration);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.putConfig = async (req, res) => {
  const { id } = req.params;
  const { remark } = req.body;

  try {
    const configuration = await Configuration.findOne({ configId: id });

    if (!configuration) {
      return res.status(404).json({ message: "Configuration not found" });
    }

    configuration.remark = remark;

    await configuration.save();

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
