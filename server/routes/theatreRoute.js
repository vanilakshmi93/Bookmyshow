const router = require("express").Router();
const Theatre = require("../model/theatreModel");

router.post("/add-theatre", async (req, res) => {
  try {
    const newTheatre = new Theatre(req.body);
    await newTheatre.save();
    res.send({ success: true, message: "Theatre added successfully" });
  } catch (err) {
    console.log(err);
    res.send({ success: false, message: err.message });
  }
});

router.put("/update-theatre", async (req, res) => {
  try {
    await Theatre.findByIdAndUpdate(req.body.theatreId, req.body);
    res.send({
      success: true,
      message: "Theatre updated successfully",
    });
  } catch (err) {
    console.log(err);
    res.send({ success: false, message: err.message });
  }
});

// router.delete("/delete-theatre/:theatreId", async (req, res) => {
//   try {
//     console.log("deleting theatre", req.params.theatreId);
//     await Theatre.findByIdAndDelete(req.params.theatreId);
//     res.send({ success: true, message: "Theatre deleted successfully" });
//   } catch (err) {
//     console.log(err);
//     res.send({ success: false, message: err.message });
//   }
// });
router.put('/delete-theatre', async (req, res) => {
  try{
      await Theatre.findByIdAndDelete(req.body.theatreId);
      res.send({
          success: true,
          message: "The theatre has been deleted!"
      })
  }catch(err){
      res.send({
          success: false,
          message: err.message
      })
  }
});

router.get("/get-all-theatres", async (req, res) => {
  try {
    const allTheatres = await Theatre.find().populate("owner");
   // console.log("reached all theatres", allTheatres);
    res.send({
      success: true,
      message: "All theatres fetched successfully",
      data: allTheatres,
    });
  } catch (err) {
    console.log(err);
    res.send({ success: false, message: err.message });
  }
});

// router.get("/get-all-theatre-by-owner/:ownerId", async (req, res) => {
//   try {
//     const allTheatres = await Theatre.find({ owner: req.params.ownerId });
//     res.send({
//       success: true,
//       message: "All theatres fetched successfully",
//       data: allTheatres,
//     });
//   } catch (err) {
//     console.log(err);
//     res.send({ success: false, message: err.message });
//   }
// });
router.post('/get-all-theatres-by-owner',  async (req, res) => {
  try{
      const allTheatres = await Theatre.find({owner: req.body.owner});
      res.send({
          success: true,
          message: "All theatres fetched successfully!",
          data: allTheatres
      })
  }catch(err){
      res.send({
          success: false,
          message: err.message
      })
  }
});
module.exports = router;