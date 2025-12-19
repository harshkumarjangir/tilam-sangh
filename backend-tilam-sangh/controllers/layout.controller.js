import Navbar from "../models/navbar.model.js";
import Footer from "../models/footer.model.js";

export const getLayoutByLanguage = async (req, res) => {
  try {
    const language = req.query.lang || "English";

    const [navbar, footer] = await Promise.all([
      Navbar.findOne({
        language,
        status: true,
        deletedAt: null
      }).lean(),

      Footer.findOne({
        language,
        status: true,
        deletedAt: null
      }).lean()
    ]);

    return res.status(200).json({
      success: true,
      language,
      data: {
        navbar: navbar?.items || [],
        footer
      }
    });
  } catch (error) {
    console.error("Layout API error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load layout"
    });
  }
};
