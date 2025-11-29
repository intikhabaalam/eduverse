import { User, Package, MessageSquare, Mail, Phone, Send, Edit, Trash2, Eye, PhoneCall, MailIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { addProduct, editProduct, getProducts, updateProduct } from '../features/products/productSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getMessages } from '../features/messages/messageSlice';

const MyProfile = () => {

    const { user } = useSelector(state => state.auth)

    const { edit, allProducts, productLoading, productError, productSuccess, productErrorMessage } = useSelector(state => state.products)
    const {allMessages,messageSuccess,messageLoading,messageError,messageErrorMessage} = useSelector(state=>state.message)





    const [formData, setFormData] = useState({
        title: "",
        isAvailable: true,
        price: "",
        itemImage: "",
        description: ""
    })

    const [myProducts, setMyProducts] = useState([])


    const { title, isAvailable, price, itemImage, description } = formData

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        // Add Product
        if (edit.isEdit) {
            dispatch(updateProduct(formData))
            if (productSuccess) {
                toast.success("Product Updated", { position: "top-center" })
            }
        } else {
            // Update Product
            dispatch(addProduct(formData))
            if (productSuccess) {
                dispatch(getProducts())
                toast.success("Product Added", { position: "top-center" })
                navigate("/marketplace")
            }
        }



        setFormData({
            title: "",
            isAvailable: true,
            price: "",
            itemImage: "",
            description: ""
        })

    }




    useEffect(() => {

        // Fetch Products
        if (allProducts.length === 0) {
            dispatch(getProducts())
        }

        setMyProducts(allProducts.filter((product) => {
            if (product.user.email === user.email) {
                return product
            }
        }))

        // Fetch Messages
        dispatch(getMessages())

        if (productError && productErrorMessage || messageError && messageErrorMessage) {
            toast.error(productErrorMessage || messageErrorMessage)
        }
        
        if(edit.isEdit && edit.product){
              setFormData(edit.product)
        }
         setFormData(edit.product)
      


    }, [productError, productErrorMessage, edit, productSuccess, messageError,messageErrorMessage])

    if (productLoading || messageLoading ) {
        return (
            <Loader />
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-blue-400">
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="space-y-8">
                    {/* My Details Section */}
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 px-8 py-6">
                            <h2 className="text-3xl font-bold text-white">My Details</h2>
                        </div>
                        <div className="p-8">
                            <div className="flex items-center gap-8">
                                <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                                    <User className="w-12 h-12 text-white" />
                                </div>
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6">
                                        <div className="flex items-center gap-3 mb-2">
                                            <User className="w-5 h-5 text-purple-600" />
                                            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Name</p>
                                        </div>
                                        <p className="text-xl font-bold text-gray-900">{user.name}</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Mail className="w-5 h-5 text-purple-600" />
                                            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Email</p>
                                        </div>
                                        <p className="text-xl font-bold text-gray-900">{user.email}</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-blue-50 to-pink-50 rounded-2xl p-6">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Phone className="w-5 h-5 text-purple-600" />
                                            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Phone</p>
                                        </div>
                                        <p className="text-xl font-bold text-gray-900">+91 {user.phone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Add Listing Section */}
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 px-8 py-6">
                            <div className="flex items-center gap-3">
                                <Package className="w-8 h-8 text-white" />
                                <h2 className="text-3xl font-bold text-white">Add New Listing</h2>
                            </div>
                        </div>
                        <div className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                                        <input
                                            value={title ||""}
                                            name='title'
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="Enter listing title"
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Availablity</label>
                                        <select defaultValue={isAvailable} onChange={handleChange} name='isAvailable' className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors">
                                            <option>Select</option>
                                            <option value={true}>Available</option>
                                            <option value={false}>Unavailable</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Price</label>
                                        <input
                                            type="number"
                                            name='price'
                                            value={price || ""}
                                            onChange={handleChange}
                                            placeholder="Enter price"
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                                        <input
                                            type="text"
                                            name='itemImage'
                                            value={itemImage || ""}
                                            onChange={handleChange}
                                            placeholder="Enter Image Url"
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                    <textarea
                                        rows={4}
                                        value={description || ""}
                                        name='description'
                                        onChange={handleChange}
                                        placeholder="Describe your item or service"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors resize-none"
                                    ></textarea>
                                </div>


                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
                                    >
                                        Publish Listing
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* My Listings Section */}
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 px-8 py-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Package className="w-8 h-8 text-white" />
                                    <h2 className="text-3xl font-bold text-white">My Listings</h2>
                                </div>
                                <span className="bg-white text-purple-600 font-bold px-4 py-2 rounded-full">{myProducts.length} Listings</span>
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Listings*/}
                                {
                                    myProducts.map((product) => {
                                        return (
                                            <div key={product._id} className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl overflow-hidden border-2 border-transparent hover:border-pink-300 transition-all hover:shadow-lg">
                                                <div className="h-48 bg-white flex items-center justify-center">
                                                    {/* <Package className="w-16 h-16 text-purple-600" /> */}
                                                    <img className="h-44 text-purple-600" src={product.itemImage} alt="" />
                                                </div>
                                                <div className="p-6">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <h3 className="text-xl font-bold text-gray-900">{product.title}</h3>
                                                        <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">{product.isAvailable ? "Active" : "InActive"}</span>
                                                    </div>
                                                    <p className="text-gray-600 text-sm mb-3">Electronics • Like New</p>
                                                    <p className="text-2xl font-bold text-purple-600 mb-4">₹{product.price}</p>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                                                        <Eye className="w-4 h-4" />
                                                        <span>145 views</span>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button onClick={() => dispatch(editProduct(product))} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                                                            <Edit className="w-4 h-4" />
                                                            Edit
                                                        </button>
                                                        <button className="bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-xl font-semibold transition-colors">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </div>
                    </div>

                    {/* My Messages Section */}
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 px-8 py-6">
                            <div className="flex items-center gap-3">
                                <MessageSquare className="w-8 h-8 text-white" />
                                <h2 className="text-3xl font-bold text-white">My Messages</h2>
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="space-y-4">
                                {/* All Messages */}
                                {
                                    allMessages.map(message => {
                                        return (
                                            <div key={message._id} className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-purple-300">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                                                            <User className="w-6 h-6 text-white" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-gray-900 text-lg">{message.user.name}</h3>
                                                            <p className="text-sm text-gray-600">{new Date(message.createdAt).toLocaleDateString('en-IN')}</p>
                                                        </div>
                                                    </div>
                                                    <span className="bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">{message.listing.title}</span>
                                                </div>
                                                <p className="text-gray-700 mb-3">{message.text}</p>
                                                <a className="text-purple-600 font-semibold hover:text-purple-700 flex items-center gap-2">
                                                    <PhoneCall className="w-4 h-4" />
                                                    {message.user.phone}
                                                </a>
                                                <a className="text-purple-600 font-semibold hover:text-purple-700 flex items-center gap-2">
                                                    <MailIcon className="w-4 h-4" />
                                                    {message.user.email}
                                                </a>
                                            </div>
                                        )
                                    })
                                }



                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default MyProfile