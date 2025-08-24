import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { JWTAxios } from "../../api/Axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  Save,
  X,
  Trash2,
  Camera,
  LogOut,
  Locate,
} from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  logedOut,
  removeData,
  updateUserData,
} from "../../state/user/UserSlice";
import { removeDatafromCart, resetCartCount } from "../../state/cart/CartSlice";

const Profile = () => {
  const isLogin = useSelector((state) => state.user.isLogedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logout } = useAuth0();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [logingout, setLogingout] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const user = useSelector((state) => state.user.data);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    country: "",
    picture: "",
    address: "",
  });

  const [editData, setEditData] = useState({
    name: "",
    contactNumber: "",
    country: "",
    address: "",
  });

  // Countries list
  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Argentina",
    "Australia",
    "Austria",
    "Bangladesh",
    "Belgium",
    "Brazil",
    "Canada",
    "China",
    "Denmark",
    "Egypt",
    "Finland",
    "France",
    "Germany",
    "India",
    "Indonesia",
    "Italy",
    "Japan",
    "Malaysia",
    "Netherlands",
    "New Zealand",
    "Norway",
    "Pakistan",
    "Philippines",
    "Singapore",
    "South Korea",
    "Spain",
    "Sri Lanka",
    "Sweden",
    "Switzerland",
    "Thailand",
    "United Kingdom",
    "United States",
    "Vietnam",
  ];

  useEffect(() => {
    if (!isLogin) {
      navigate("/");
      return;
    }
    fetchUserProfile();
  }, [isLogin, navigate]);

  const fetchUserProfile = async () => {
    setUserData({
      name: user.name || "",
      email: user.email || "",
      contactNumber: user.contactNumber || "",
      country: user.country || "",
      picture: user.picture || "",
      address: user.address || "",
    });

    setEditData({
      name: user.name || "",
      contactNumber: user.contactNumber || "",
      country: user.country || "",
      address: user.address || "",
    });

    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      name: userData.name,
      contactNumber: userData.contactNumber,
      country: userData.country,
      address: userData.address,
    });
  };

  const handleSave = async () => {
    setUpdating(true);

    if (!editData.name.trim()) {
      toast.error("Name is required", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setUpdating(false);
      return;
    }

    try {
      const response = await JWTAxios.put("/user/updateprofile", editData);

      if (response.data.status) {
        setUserData((prev) => ({
          ...prev,
          ...editData,
        }));

        dispatch(updateUserData(editData));

        setIsEditing(false);

        toast.success("Profile updated successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        toast.error(response.data.message || "Failed to update profile", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Error updating profile", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);

    try {
      const response = await JWTAxios.delete("/user/deleteaccount");

      if (response.data.status) {
        toast.success("Account deleted successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        dispatch(logedOut());
        dispatch(resetCartCount());
        dispatch(removeDatafromCart());
        dispatch(removeData());
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        await logout();
      } else {
        toast.error(response.data.message || "Failed to delete account", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Error deleting account", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleLogout = async () => {
    setLogingout(true);
    if (isLogin) {
      dispatch(logedOut());
      dispatch(resetCartCount());
      dispatch(removeDatafromCart());
      dispatch(removeData());
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      await logout();
    }
    setLogingout(false);
    setShowLogoutConfirm(false);
  };

  if (loading) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-theme flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="bg-theme-neutral p-8 rounded-lg shadow-lg">
          <div className="animate-pulse">
            <h2 className="text-2xl md:text-3xl font-heading text-theme-primary font-bold">
              Loading profile...
            </h2>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-theme py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-theme-neutral rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-theme-secondary">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-theme-primary">
                  My Profile
                </h2>
                <p className="text-theme-secondary mt-1">
                  Manage your account information
                </p>
              </div>
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 bg-theme-primary text-theme-neutral px-4 py-2 rounded-md hover:bg-theme-accent hover:text-theme font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-theme-primary"
                >
                  <Edit size={18} />
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    disabled={updating}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                  >
                    <Save size={18} />
                    {updating ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    <X size={18} />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Profile Picture Section */}
              <div className="md:col-span-1">
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    <img
                      src={userData.picture || "/api/placeholder/150/150"}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-theme-secondary shadow-lg"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-theme-primary">
                    {userData.name}
                  </h3>
                </div>
              </div>

              {/* Profile Information */}
              <div className="md:col-span-2 space-y-6">
                {/* Name */}
                <div>
                  <label className="flex items-center text-theme-primary font-medium mb-2">
                    <User size={18} className="mr-2" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-theme border border-theme-secondary rounded-md text-theme focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent transition-all duration-300"
                      placeholder="Enter full name"
                    />
                  ) : (
                    <p className="text-theme bg-theme border border-theme-secondary rounded-md px-4 py-3">
                      {userData.name || "Not set"}
                    </p>
                  )}
                </div>

                {/* Email (Read-only) */}
                <div>
                  <label className="flex items-center text-theme-primary font-medium mb-2">
                    <Mail size={18} className="mr-2" />
                    Email Address
                  </label>
                  <p className="text-theme-secondary bg-theme border border-theme-secondary rounded-md px-4 py-3 opacity-60">
                    {userData.email || "Not set"}
                  </p>
                  <small className="text-theme-secondary text-xs">
                    Email cannot be changed as it's managed by your
                    authentication provider
                  </small>
                </div>

                {/* Contact Number */}
                <div>
                  <label className="flex items-center text-theme-primary font-medium mb-2">
                    <Phone size={18} className="mr-2" />
                    Contact Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="contactNumber"
                      value={editData.contactNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-theme border border-theme-secondary rounded-md text-theme focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent transition-all duration-300"
                      placeholder="Enter contact number"
                    />
                  ) : (
                    <p className="text-theme bg-theme border border-theme-secondary rounded-md px-4 py-3">
                      {userData.contactNumber || "Not set"}
                    </p>
                  )}
                </div>

                {/* Country */}
                <div>
                  <label className="flex items-center text-theme-primary font-medium mb-2">
                    <MapPin size={18} className="mr-2" />
                    Country
                  </label>
                  {isEditing ? (
                    <select
                      name="country"
                      value={editData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-theme border border-theme-secondary rounded-md text-theme focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select country</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-theme bg-theme border border-theme-secondary rounded-md px-4 py-3">
                      {userData.country || "Not set"}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="flex items-center text-theme-primary font-medium mb-2">
                    <Locate size={18} className="mr-2" />
                    Address
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={editData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-theme border border-theme-secondary rounded-md text-theme focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent transition-all duration-300"
                      placeholder="Enter Address"
                    />
                  ) : (
                    <p className="text-theme bg-theme border border-theme-secondary rounded-md px-4 py-3">
                      {userData.address || "Not set"}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="mt-12 pt-6 border-t border-theme-secondary">
              <h3 className="text-xl font-semibold text-red-500 mb-4">
                Danger Zone
              </h3>

              <div className="space-y-4">
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-medium text-red-800 dark:text-red-300">
                        Logout
                      </h4>
                      <p className="text-red-600 dark:text-red-400 text-sm">
                        Logout from your account on this device.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowLogoutConfirm(true)}
                      className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-medium text-red-800 dark:text-red-300">
                        Delete Account
                      </h4>
                      <p className="text-red-600 dark:text-red-400 text-sm">
                        Once you delete your account, there is no going back.
                        Please be certain.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <Trash2 size={18} />
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="text-theme-accent hover:text-theme-primary transition-colors duration-300 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-theme-neutral rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-theme-primary mb-4">
              Confirm Account Deletion
            </h3>
            <p className="text-theme-secondary mb-6">
              Are you sure you want to delete your account? This action cannot
              be undone and all your data will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDeleteAccount}
                disabled={deleting}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Yes, Delete Account"}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-theme-neutral rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-theme-primary mb-4">
              Confirm Logout
            </h3>
            <p className="text-theme-secondary mb-6">
              Are you sure you want to logout your account?
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleLogout}
                disabled={logingout}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
              >
                {logingout ? "..." : "Yes, Logout"}
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
