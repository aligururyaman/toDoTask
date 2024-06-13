import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { FIRESTORE_DB } from "firebaseConfig";

// Define the Category interface
interface Category {
  icon: string;
  todo: string;
  color: string;
}

// Define the initial state for Categories
interface CategoriesState {
  suggestions: Category[];
  exercises: Category[];
  cleanandorg: Category[];
  loading: boolean;
  error: string | null;
}

const initialCategoriesState: CategoriesState = {
  suggestions: [],
  exercises: [],
  cleanandorg: [],
  loading: true,
  error: null,
};

export interface FirestoreUserData {
  date: string;
  item: string;
  icon: string;
  color: string;
  timestamp: Timestamp;
}

export interface ReduxUserData {
  id: string; // Add id field to track the document
  date: string;
  item: string;
  icon: string;
  color: string;
  timestamp: string; // Redux için string olarak değiştirildi
}

// Define the UserData interface
export interface UserData {
  date: string;
  item: string; // This will store todo
  icon: string;
  color: string;
  timestamp: Timestamp;
  desc: string;
  days: string[];
  tag: string;
}

// Define the initial state for UserData
interface UserDataState {
  data: ReduxUserData[];
  loading: boolean;
  error: string | null;
  selectedDate: string | null; // selectedDate eklendi
}

const initialUserDataState: UserDataState = {
  data: [],
  loading: true,
  error: null,
  selectedDate: null, // selectedDate başlatıldı
};

export interface UserProfile {
  name: string;
  surName: string;
  age: string;
  weight: string;
  size: string;
}

// Define the initial state for UserProfile
interface UserProfileState {
  profile: UserProfile;
  loading: boolean;
  error: string | null;
}

const initialProfileState: UserProfileState = {
  profile: {
    name: "",
    surName: "",
    age: "",
    weight: "",
    size: "",
  },
  loading: false,
  error: null,
};
// Create async thunks for fetching data from Firestore
export const fetchSuggestions = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>("categories/fetchSuggestions", async (_, { rejectWithValue }) => {
  try {
    const suggesCollection = collection(FIRESTORE_DB, "suggestions");
    const suggestionsData: Category[] = [];

    const fetchCollectionData = (collectionRef: any) =>
      new Promise<void>((resolve, reject) => {
        const unsubscribe = onSnapshot(
          collectionRef,
          (snapshot: QuerySnapshot<DocumentData>) => {
            snapshot.forEach((doc) => {
              const data = doc.data();
              suggestionsData.push({
                icon: data.icon,
                todo: data.todo,
                color: data.color,
              });
            });
            resolve();
          },
          reject
        );
      });

    await fetchCollectionData(suggesCollection);
    return suggestionsData;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error"
    );
  }
});

export const fetchExercises = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>("categories/fetchExercises", async (_, { rejectWithValue }) => {
  try {
    const exerciseCollection = collection(FIRESTORE_DB, "exercise");
    const exercisesData: Category[] = [];

    const fetchCollectionData = (collectionRef: any) =>
      new Promise<void>((resolve, reject) => {
        const unsubscribe = onSnapshot(
          collectionRef,
          (snapshot: QuerySnapshot<DocumentData>) => {
            snapshot.forEach((doc) => {
              const data = doc.data();
              exercisesData.push({
                icon: data.icon,
                todo: data.todo,
                color: data.color,
              });
            });
            resolve();
          },
          reject
        );
      });

    await fetchCollectionData(exerciseCollection);
    return exercisesData;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error"
    );
  }
});

export const fetchCleanandOrg = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>("categories/fetchCleanandOrg", async (_, { rejectWithValue }) => {
  try {
    const cleanandorgCollection = collection(FIRESTORE_DB, "cleanandorg");
    const cleanandorgData: Category[] = [];

    const fetchCollectionData = (collectionRef: any) =>
      new Promise<void>((resolve, reject) => {
        const unsubscribe = onSnapshot(
          collectionRef,
          (snapshot: QuerySnapshot<DocumentData>) => {
            snapshot.forEach((doc) => {
              const data = doc.data();
              cleanandorgData.push({
                icon: data.icon,
                todo: data.todo,
                color: data.color,
              });
            });
            resolve();
          },
          reject
        );
      });

    await fetchCollectionData(cleanandorgCollection);
    return cleanandorgData;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error"
    );
  }
});

export const fetchUserData = createAsyncThunk<
  ReduxUserData[],
  string,
  { rejectValue: string }
>("userData/fetchUserData", async (userId, { rejectWithValue }) => {
  try {
    const userCollectionRef = collection(
      FIRESTORE_DB,
      "users",
      userId,
      "userData"
    );

    const q = query(userCollectionRef, orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    const userData: ReduxUserData[] = querySnapshot.docs.map((doc) => {
      const data = doc.data() as FirestoreUserData;
      return {
        id: doc.id, // Capture the document id
        date: data.date,
        item: data.item,
        icon: data.icon,
        color: data.color,
        timestamp: data.timestamp.toDate().toISOString(), // ISO string'e dönüştür
      };
    });
    return userData;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error"
    );
  }
});

export const addUserData = createAsyncThunk<
  void,
  { userId: string; data: UserData },
  { rejectValue: string }
>("userData/addUserData", async ({ userId, data }, { rejectWithValue }) => {
  try {
    const userCollectionRef = collection(
      FIRESTORE_DB,
      "users",
      userId,
      "userData"
    );
    await addDoc(userCollectionRef, {
      ...data,
      timestamp: Timestamp.now(),
    });
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error"
    );
  }
});

export const deleteUserData = createAsyncThunk<
  string,
  { userId: string; itemId: string },
  { rejectValue: string }
>(
  "userData/deleteUserData",
  async ({ userId, itemId }, { rejectWithValue }) => {
    try {
      const itemDocRef = doc(FIRESTORE_DB, "users", userId, "userData", itemId);
      await deleteDoc(itemDocRef);
      return itemId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

// Kullanıcı profil verilerini getir
export const fetchUserProfile = createAsyncThunk<
  UserProfile,
  string,
  { rejectValue: string }
>("userProfile/fetchUserProfile", async (userId, { rejectWithValue }) => {
  try {
    const userDocRef = doc(
      FIRESTORE_DB,
      "users",
      userId,
      "userInfo",
      "profile"
    );
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    } else {
      return { name: "", surName: "", age: "", weight: "", size: "" }; // Yeni kullanıcı için varsayılan değerler
    }
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Bilinmeyen hata"
    );
  }
});

// Kullanıcı profil verilerini güncelle
export const updateUserProfile = createAsyncThunk<
  void,
  { userId: string; data: UserProfile },
  { rejectValue: string }
>(
  "userProfile/updateUserProfile",
  async ({ userId, data }, { rejectWithValue }) => {
    try {
      const userDocRef = doc(
        FIRESTORE_DB,
        "users",
        userId,
        "userInfo",
        "profile"
      );
      await setDoc(userDocRef, data, { merge: true });
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Bilinmeyen hata"
      );
    }
  }
);
// Create slices for categories and userData
const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialCategoriesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSuggestions.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.suggestions = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(fetchSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch suggestions";
      })
      .addCase(fetchExercises.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchExercises.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.exercises = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(fetchExercises.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch exercises";
      })
      .addCase(fetchCleanandOrg.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCleanandOrg.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.cleanandorg = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(fetchCleanandOrg.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch cleanandorg";
      });
  },
});

const userDataSlice = createSlice({
  name: "userData",
  initialState: initialUserDataState,
  reducers: {
    setSelectedDate(state, action: PayloadAction<string | null>) {
      state.selectedDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserData.fulfilled,
        (state, action: PayloadAction<ReduxUserData[]>) => {
          state.data = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch user data";
      })
      .addCase(addUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUserData.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add user data";
      })
      .addCase(
        deleteUserData.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.data = state.data.filter((item) => item.id !== action.payload);
        }
      )
      .addCase(deleteUserData.rejected, (state, action) => {
        state.error = action.payload || "Failed to delete user data";
      });
  },
});

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: initialProfileState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserProfile.fulfilled,
        (state, action: PayloadAction<UserProfile>) => {
          state.profile = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch user profile";
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update user profile";
      });
  },
});

export const { setSelectedDate } = userDataSlice.actions;
export const userDataReducer = userDataSlice.reducer;
export const categoriesReducer = categoriesSlice.reducer;
export const userProfileReducer = userProfileSlice.reducer;
