export const isLoged = async (req, res) => {
  try {
    res
      .status(200)
      .json({ success: true, message: "This user is authenticaed" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "This user is not authenticaed" });
  }
};
