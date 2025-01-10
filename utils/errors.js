const handleError = (err, id) => {
  console.error(err);
  if (err.name === "ValidationError") {
    res.status(400).send({ message: err.message });
  } else if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).send({ message: "Invalid ID" });
  } else {
    res.status(404).send({ message: "ID not found" });
  }
  res.status(500).send({ message: err.message });
};

// DocumentNotFoundError = 400

//4
