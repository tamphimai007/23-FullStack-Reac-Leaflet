const Travel = require("../Models/Travel");
const fs = require("fs");

exports.list = async (req, res) => {
  try {
    // code
    const producted = await Travel.find({}).exec();
    res.send(producted);
  } catch (err) {
    // error
    console.log(err);
    res.status(500).send("Server Error");
  }
};
exports.create = async (req, res) => {
  try {
    // code
    // console.log(req.file)
    var data = req.body;
    if (req.file) {
      data.file = req.file.filename;
    }
    const producted = await Travel(data).save();
    res.send(producted);
  } catch (err) {
    // error
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.remove = async (req, res) => {
  try {
    // code
    const id = req.params.id;
    const removed = await Travel.findOneAndDelete({ _id: id }).exec();
    if (removed?.file) {
      await fs.unlink("./uploads/" + removed.file, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Remove Success");
        }
      });
    }

    console.log(removed);

    res.send(removed);
  } catch (err) {
    // error
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.read = async (req, res) => {
  try {
    // code
    const id = req.params.id;
    const travel = await Travel.findOne({ _id: id }).exec();
    res.send(travel);
  } catch (err) {
    // error
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.update = async (req, res) => {
  try {
    // code
    const id = req.params.id;
    var data = req.body;

    if (typeof req.file !== "undefined") {
      data.file = req.file.filename;
      await fs.unlink("./uploads/" + data.fileold, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Remove Success");
        }
      });
    }

    const updated = await Travel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    }).exec();
    res.send(updated);
  } catch (err) {
    // error
    console.log(err);
    res.status(500).send("Server Error");
  }
};
