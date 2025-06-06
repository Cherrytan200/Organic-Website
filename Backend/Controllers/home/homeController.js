import mongoose from 'mongoose';
import categoryModel from '../../Models/categoryModel.js';
import productModel from '../../Models/productModel.js';
import reviewModel from '../../Models/reviewModel.js';
import { responseReturn } from '../../utils/response.js';
import queryProducts from '../../utils/queryProducts.js';
import moment from 'moment';

const { ObjectId } = mongoose.Types;

// Helper function to format products
export const formateProduct = (products) => {
    const productArray = [];
    let i = 0;
    while (i < products.length) {
        let temp = [];
        let j = i;
        while (j < i + 3) {
            if (products[j]) {
                temp.push(products[j]);
            }
            j++;
        }
        productArray.push([...temp]);
        i = j;
    }
    return productArray;
};

// Get categories
export const get_categories = async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        console.log(categories);
        responseReturn(res, 200, {
            categories,
        });
    } catch (error) {
        console.log(error.message);
    }
};

// Get products
export const get_products = async (req, res) => {
    try {
        const products = await productModel.find({}).limit(12).sort({
            createdAt: -1,
        });

        const allProduct1 = await productModel.find({}).limit(9).sort({
            createdAt: -1,
        });
        const latest_product = formateProduct(allProduct1); // Call formateProduct directly
        console.log('latest_Product', latest_product);

        const allProduct2 = await productModel.find({}).limit(9).sort({
            rating: -1,
        });
        const topRated_product = formateProduct(allProduct2); // Call formateProduct directly
        console.log('topRated_Product', topRated_product);

        const allProduct3 = await productModel.find({}).limit(9).sort({
            discount: -1,
        });
        const discount_product = formateProduct(allProduct3); // Call formateProduct directly
        console.log('Discount Product', discount_product);

        responseReturn(res, 200, {
            products,
            latest_product,
            topRated_product,
            discount_product,
        });
    } catch (error) {
        console.log(error.message);
    }
};

// Get price range products
export const price_range_product = async (req, res) => {
    try {
        const priceRange = {
            low: 0,
            high: 0,
        };
        const products = await productModel.find({}).limit(9).sort({
            createdAt: -1, // 1 for asc, -1 for desc
        });
        const latest_product = formateProduct(products); // Call formateProduct directly
        const getForPrice = await productModel.find({}).sort({
            price: 1,
        });
        if (getForPrice.length > 0) {
            priceRange.high = getForPrice[getForPrice.length - 1].price;
            priceRange.low = getForPrice[0].price;
        }
        responseReturn(res, 200, {
            latest_product,
            priceRange,
        });
    } catch (error) {
        console.log(error.message);
    }
};

// Query products
export const query_products = async (req, res) => {
    const perPage = 12;
    req.query.perPage = perPage;

    try {
        const products = await productModel.find({}).sort({
            createdAt: -1,
        });
        const totalProduct = new queryProducts(products, req.query)
            .categoryQuery()
            .ratingQuery()
            .searchQuery()
            .priceQuery()
            .sortByPrice()
            .countProducts();

        const result = new queryProducts(products, req.query)
            .categoryQuery()
            .ratingQuery()
            .priceQuery()
            .searchQuery()
            .sortByPrice()
            .skip()
            .limit()
            .getProducts();

        responseReturn(res, 200, {
            products: result,
            totalProduct,
            perPage,
        });
    } catch (error) {
        console.log(error.message);
    }
};

// Get product details
export const product_details = async (req, res) => {
    const { slug } = req.params;
    try {
        const product = await productModel.findOne({ slug });

        const relatedProducts = await productModel.find({
            $and: [
                {
                    _id: {
                        $ne: product.id,
                    },
                },
                {
                    category: {
                        $eq: product.category,
                    },
                },
            ],
        }).limit(12);

        const moreProducts = await productModel.find({
            $and: [
                {
                    _id: {
                        $ne: product.id,
                    },
                },
                {
                    sellerId: {
                        $eq: product.sellerId,
                    },
                },
            ],
        }).limit(3);

        responseReturn(res, 200, {
            product,
            relatedProducts,
            moreProducts,
        });
    } catch (error) {
        console.log(error.message);
    }
};

// Submit review
export const submit_review = async (req, res) => {
    const { productId, rating, review, name } = req.body;

    try {
        await reviewModel.create({
            productId,
            name,
            rating,
            review,
            date: moment(Date.now()).format('LL'),
        });

        let rat = 0;
        const reviews = await reviewModel.find({
            productId,
        });
        for (let i = 0; i < reviews.length; i++) {
            rat = rat + reviews[i].rating;
        }
        let productRating = 0;
        if (reviews.length !== 0) {
            productRating = (rat / reviews.length).toFixed(1);
        }

        await productModel.findByIdAndUpdate(productId, {
            rating: productRating,
        });

        responseReturn(res, 201, {
            message: 'Review Added Successfully',
        });
    } catch (error) {
        console.log(error.message);
    }
};

// Get reviews
export const get_reviews = async (req, res) => {
    const { productId } = req.params;
    let { pageNo } = req.query;
    pageNo = parseInt(pageNo);
    const limit = 5;
    const skipPage = limit * (pageNo - 1);

    try {
        let getRating = await reviewModel.aggregate([
            {
                $match: {
                    productId: {
                        $eq: new ObjectId(productId),
                    },
                    rating: {
                        $not: {
                            $size: 0,
                        },
                    },
                },
            },
            {
                $unwind: '$rating',
            },
            {
                $group: {
                    _id: '$rating',
                    count: {
                        $sum: 1,
                    },
                },
            },
        ]);

        let rating_review = [
            {
                rating: 5,
                sum: 0,
            },
            {
                rating: 4,
                sum: 0,
            },
            {
                rating: 3,
                sum: 0,
            },
            {
                rating: 2,
                sum: 0,
            },
            {
                rating: 1,
                sum: 0,
            },
        ];

        for (let i = 0; i < rating_review.length; i++) {
            for (let j = 0; j < getRating.length; j++) {
                if (rating_review[i].rating === getRating[j]._id) {
                    rating_review[i].sum = getRating[j].count;
                    break;
                }
            }
        }

        const getAll = await reviewModel.find({
            productId,
        });
        const reviews = await reviewModel.find({
            productId,
        })
            .skip(skipPage)
            .limit(limit)
            .sort({ createdAt: -1 });

        responseReturn(res, 200, {
            reviews,
            totalReview: getAll.length,
            rating_review,
        });
    } catch (error) {
        console.log(error.message);
    }
};