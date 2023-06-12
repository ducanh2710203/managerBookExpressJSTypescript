"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const Product_1 = require("./src/entity/Product");
const data_source_1 = require("./src/data-source");
const PORT = 3123;
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/upload');
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
data_source_1.AppDataSource
    .initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
const app = (0, express_1.default)();
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use(express_1.default.static('./src/public'));
app.get('/products', async (req, res) => {
    let products = await data_source_1.AppDataSource.getRepository(Product_1.product).find();
    res.render('list', { products: products });
});
app.get('/products/create', (req, res) => {
    res.render('create');
});
app.post("/products/create", upload.single('image'), async (req, res) => {
    try {
        let Product = new Product_1.product();
        Product.price = req.body.price;
        Product.name = req.body.name;
        Product.image = req.file.originalname;
        Product.author = req.body.author;
        const productRepository = data_source_1.AppDataSource.getRepository(Product_1.product);
        await productRepository.save(Product);
        res.redirect("/products");
    }
    catch (e) {
        console.log(e.message);
    }
});
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/products`);
});
//# sourceMappingURL=server.js.map