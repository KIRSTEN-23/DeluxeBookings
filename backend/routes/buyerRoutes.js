console.log("BUYER ROUTES LOADED");

router.get("/listings", (req, res) => {
  res.json({ message: "Buyer: get all available listings" });
});

router.get("/listings/:id", (req, res) => {
  res.json({
    message: "Buyer: get one available listing",
    listingId: req.params.id,
  });
});

router.post("/listings/:id/favourite", (req, res) => {
  res.json({
    message: "Buyer: favourite listing",
    listingId: req.params.id,
  });
});