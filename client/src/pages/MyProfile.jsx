import { User, Package, MessageSquare, Mail, Phone, Eye, PhoneCall, MailIcon, Edit, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { addProduct, editProduct, getProducts, updateProduct } from '../features/products/productSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getMessages } from '../features/messages/messageSlice';

const MyProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector(state => state.auth);

    const {
        edit,
        allProducts,
        productLoading,
        productError,
        productErrorMessage
    } = useSelector(state => state.products);

    const {
        allMessages,
        messageLoading,
        messageError,
        messageErrorMessage
    } = useSelector(state => state.message);

    const [formData, setFormData] = useState({
        title: "",
        isAvailable: true,
        price: "",
        itemImage: "",
        description: ""
    });

    const [myProducts, setMyProducts] = useState([]);

    const { title, isAvailable, price, itemImage, description } = formData;

    // INPUT CHANGE
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: name === "isAvailable" ? value === "true" : value
        }));
    };

    // SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (edit?.isEdit) {
                await dispatch(updateProduct(formData)).unwrap();
                toast.success("Product Updated");
            } else {
                await dispatch(addProduct(formData)).unwrap();
                toast.success("Product Added");
                dispatch(getProducts());
                navigate("/marketplace");
            }

            setFormData({
                title: "",
                isAvailable: true,
                price: "",
                itemImage: "",
                description: ""
            });

        } catch (err) {
            toast.error(err?.message || "Something went wrong");
        }
    };

    // EFFECT (ONLY STABLE DEPENDENCIES)
    useEffect(() => {
        if (allProducts.length === 0) {
            dispatch(getProducts());
        }

        dispatch(getMessages());

    }, [dispatch]);

    // FILTER USER PRODUCTS (SAFE)
    useEffect(() => {
        if (allProducts?.length && user?.email) {
            setMyProducts(
                allProducts.filter(p => p?.user?.email === user?.email)
            );
        }
    }, [allProducts, user]);

    // EDIT MODE FILL FORM
    useEffect(() => {
        if (edit?.isEdit && edit?.product) {
            setFormData(edit.product);
        }
    }, [edit]);

    // ERROR HANDLING
    useEffect(() => {
        if (productError || messageError) {
            toast.error(productErrorMessage || messageErrorMessage);
        }
    }, [productError, messageError, productErrorMessage, messageErrorMessage]);

    if (productLoading || messageLoading) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-blue-400">
            <main className="max-w-7xl mx-auto px-4 py-12 space-y-8">

                {/* USER INFO */}
                <div className="bg-white rounded-3xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold mb-4">My Details</h2>
                    <p><b>Name:</b> {user?.name}</p>
                    <p><b>Email:</b> {user?.email}</p>
                    <p><b>Phone:</b> +91 {user?.phone}</p>
                </div>

                {/* FORM */}
                <div className="bg-white rounded-3xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold mb-4">Add Listing</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <input
                            name="title"
                            value={title}
                            onChange={handleChange}
                            placeholder="Title"
                            className="w-full border p-3 rounded"
                        />

                        <select
                            name="isAvailable"
                            value={isAvailable}
                            onChange={handleChange}
                            className="w-full border p-3 rounded"
                        >
                            <option value="true">Available</option>
                            <option value="false">Unavailable</option>
                        </select>

                        <input
                            name="price"
                            type="number"
                            value={price}
                            onChange={handleChange}
                            placeholder="Price"
                            className="w-full border p-3 rounded"
                        />

                        <input
                            name="itemImage"
                            value={itemImage}
                            onChange={handleChange}
                            placeholder="Image URL"
                            className="w-full border p-3 rounded"
                        />

                        <textarea
                            name="description"
                            value={description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="w-full border p-3 rounded"
                        />

                        <button className="bg-purple-600 text-white px-6 py-3 rounded">
                            Publish
                        </button>
                    </form>
                </div>

                {/* PRODUCTS */}
                <div className="bg-white rounded-3xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold mb-4">
                        My Listings ({myProducts?.length || 0})
                    </h2>

                    <div className="grid md:grid-cols-3 gap-4">
                        {(myProducts || []).map(product => (
                            <div key={product._id} className="border rounded-xl p-4">
                                <img src={product.itemImage} className="h-40 w-full object-cover" />

                                <h3 className="font-bold mt-2">{product.title}</h3>
                                <p>₹{product.price}</p>

                                <button
                                    onClick={() => dispatch(editProduct(product))}
                                    className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
                                >
                                    Edit
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* MESSAGES */}
                <div className="bg-white rounded-3xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold mb-4">Messages</h2>

                    {(allMessages || []).map(message => (
                        <div key={message._id} className="border p-4 rounded mb-3">
                            <p><b>{message.user?.name}</b></p>
                            <p>{message.text}</p>
                            <p>{message.user?.phone}</p>
                            <p>{message.user?.email}</p>
                        </div>
                    ))}
                </div>

            </main>
        </div>
    );
};

export default MyProfile;