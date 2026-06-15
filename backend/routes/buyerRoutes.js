console.log("BUYER ROUTES LOADED");

router.post("/listings/:id/favourite", (req, res) => {
  res.json({
    message: "Buyer: favourite listing",
    listingId: req.params.id,
  });
});