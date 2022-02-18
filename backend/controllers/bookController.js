import book from "../models/book.js";

const registerBook = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.author ||
    !req.body.editorial ||
    !req.body.yearPublication ||
    !req.body.pages ||
    !req.body.category ||
    !req.body.priceRental ||
    !req.body.pricePurchase
  )
    return res.status(400).send({ message: "Incomplete data" });

  let bookSchema = new book({
    name: req.body.name,
    author: req.body.author,
    editorial: req.body.editorial,
    yearPublication: req.body.yearPublication,
    pages: req.body.pages,
    category: req.body.category,
    priceRental: req.body.priceRental,
    pricePurchase: req.body.pricePurchase,
    dbStatus: true,
  });

  let result = await bookSchema.save();
  if (!result)
    return res.status(500).send({ message: "Falied to register book" });
  return res.status(200).send({ result });
};

const listBook = async  (req,res)  =>{
    let books = await book.find({name : new RegExp(req.params["name"])});
    if(books.length === 0) return res.status(500).send({message:"No search resulst"})
    return res.status(200).send({books});
}

export default { registerBook, listBook };
