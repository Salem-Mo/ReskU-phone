import { create } from "zustand";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ServerUrl = 'https://resku-backend-production.up.railway.app';
const API_URL = `${ServerUrl}/api/auth`;

export const useAuth = create((set) => ({
  user: null,
  isAuthenticated: false,
  userImage: null,
  color: null,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, { email, password, name });
      await AsyncStorage.setItem("token", response.data.token);
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || "Error signing up", isLoading: false });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      set({ isAuthenticated: true, user: response.data.user, error: null, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      await AsyncStorage.removeItem("token");
      set({ user: null, isAuthenticated: false, error: null, isLoading: false });
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("No token found");
      const response = await axios.get(`${API_URL}/check-auth`, { headers: { Authorization: `Bearer ${token}` } });
      set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
    } catch (error) {
      set({ error: error.response?.data?.message || "Error checking auth", isCheckingAuth: false });
    }
  },

  updateProfile: async (userID, name, country, color, userImage, supplies) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/update-profile/`, { userID, name, country, color, userImage, supplies });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: error.response?.data?.message || "Error updating profile" });
      throw error;
    }
  },

  addProfileImg: async (userID, imgFile) => {
    set({ isLoading: true, error: null });
    const formData = new FormData();
    formData.append("userID", userID);
    formData.append("profile-image", {
      uri: imgFile.uri,
      name: "profile.jpg",
      type: "image/jpeg",
    });
    try {
      const response = await axios.post(`${API_URL}/add-profile-img/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: error.response?.data?.message || "Error uploading image" });
      throw error;
    }
  },

  delProfileImg: async (userID) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/del-profile-img/`, { userID });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: error.response?.data?.message || "Error deleting image" });
      throw error;
    }
  },
}));
