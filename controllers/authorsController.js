const Author = require("../schema/author");

const authorsController = {
   async getAuthors(req, res) {
      const { search } = req.query
      try {
         let authors
         if (search) {
            authors = await Author.find({ name: { $regex: search, $options: 'i' } })
         }
         else {
            authors = await Author.find({});
         }
         return res.status(200).json({ authors, message: "Authors fetched successfully" });
      } catch (err) {
         console.error("Error fetching authors:", err);
         res.status(500).json({ message: "Internal server error", error: err.message });
      }
   }
};

module.exports = authorsController;
