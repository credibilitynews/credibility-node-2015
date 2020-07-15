/* eslint-disable class-methods-use-this */
import { ReduceStore } from "flux/utils";

import Immutable from "immutable";
import { ActionTypes } from "../constants/app-constants";
import AppDispatcher from "../dispatchers/app-dispatcher";

function addCategory(state, category) {
  state = state.set(category.id, category);
  return state;
}

function addCategories(state, categories) {
  Object.keys(categories).map((key) => {
    const category = categories[key];
    state = addCategory(state, category);
  });
  return state;
}

class CategoryStore extends ReduceStore {
  getInitialState() {
    return {
      categories: Immutable.OrderedMap(),
      topCategories: Immutable.OrderedMap(),
    };
  }

  getCategory = (categoryId) => {
    return this.getState().categories.get(categoryId.toString());
  };

  getAllCategories = () => {
    return this.getState()
      .categories.toArray()
      .map((i) => i[1]);
  };

  getTopCategories = () => {
    return this.getState()
      .topCategories.toArray()
      .map((i) => i[1]);
  };

  reduce(state, payload) {
    // console.log("CategoryStore", state, payload);
    const { action } = payload;

    switch (action.actionType) {
      case ActionTypes.FETCH_ALL_TAGS:
        // console.log("store/category-store", payload.action.tags);
        return {
          ...state,
          categories: addCategories(state.categories, payload.action.tags),
        };

      case ActionTypes.FETCH_TOP_TAGS:
        // console.log(
        //   ActionTypes.FETCH_TOP_TAGS,
        //   addCategories(state.topCategories, payload.action.topTags)
        // );

        return {
          ...state,
          topCategories: addCategories(
            state.topCategories,
            payload.action.topTags
          ),
        };
      default:
      // do nothing
    }
    return state;
  }
}

const instance = new CategoryStore(AppDispatcher);
export default instance;
