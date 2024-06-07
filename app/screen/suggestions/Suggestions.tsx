import AddMoreBtn from "@/components/buttons/AddMoreBtn";
import ButtomSlide from "@/components/buttons/ButtomSlide";
import SuggestionsComp from "@/components/suggestions/SuggestionsComp";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCleanandOrg,
  fetchExercises,
  fetchSuggestions,
} from "redux/categoriesSlice";
import { AppDispatch, RootState } from "redux/store";
import Loading from "../loading/Loading";

const titleData = [
  " 🧠 Learn and study more",
  " 🏋️‍♂️ Exercise",
  " 🧹 Clean and Organize",
];

const infoData = [
  "Stay hungry for knowledge",
  "Become your best version",
  "Get you life togheter",
];

const colors = [
  "#FFEE93",
  "#FFC09F",
  "#ADF7B6",
  "#DEB5E4",
  "#CA87F4",
  "#D9D9D9",
];

export default function Suggestions() {
  const dispatch: AppDispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.categories.suggestions
  );
  const exercises = useSelector(
    (state: RootState) => state.categories.exercises
  );
  const cleanandorg = useSelector(
    (state: RootState) => state.categories.cleanandorg
  );
  const loading = useSelector((state: RootState) => state.categories.loading);
  const error = useSelector((state: RootState) => state.categories.error);

  useEffect(() => {
    dispatch(fetchSuggestions());
    dispatch(fetchExercises());
    dispatch(fetchCleanandOrg());
  }, [dispatch]);

  if (loading) {
    <Loading />;
  }

  const categoryTodos = categories.map((category) => category.todo);
  const exercisesTodos = exercises.map((category) => category.todo);
  const cleanandorgTodos = cleanandorg.map((category) => category.todo);
  const categoryIcon = categories.map((category) => category.icon);
  const exercisesIcon = exercises.map((category) => category.icon);
  const cleanandorgIcon = cleanandorg.map((category) => category.icon);
  const categoryColor = categories.map((category) => category.color);
  const exercisesColor = exercises.map((category) => category.color);
  const cleanandorgColor = cleanandorg.map((category) => category.color);
  const showLog = () => {
    console.log(categoryTodos);
  };
  return (
    <SafeAreaView>
      <View>
        <View className="items-center">
          <Text style={{ fontFamily: "PopMed" }} onPress={() => showLog()}>
            Suggestions
          </Text>
        </View>

        <View className="top-10 gap-10">
          <SuggestionsComp
            title={titleData[0]}
            info={infoData[0]}
            sugges={categoryTodos}
            colors={categoryColor}
            icon={categoryIcon}
          />
          <SuggestionsComp
            title={titleData[1]}
            info={infoData[1]}
            sugges={exercisesTodos}
            colors={exercisesColor}
            icon={exercisesIcon}
          />
          <SuggestionsComp
            title={titleData[2]}
            info={infoData[2]}
            sugges={cleanandorgTodos}
            colors={cleanandorgColor}
            icon={cleanandorgIcon}
          />
        </View>
      </View>
      <View className="top-28 justify-center items-center">
        <AddMoreBtn />
      </View>
      <View className="top-[10rem]">
        <ButtomSlide />
      </View>
    </SafeAreaView>
  );
}
