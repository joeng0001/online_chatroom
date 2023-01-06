exports.test_get = (req, res) => {
    console.log("receing get request");
    res.send({
        message:"you get it successfully"
    })
  };