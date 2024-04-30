// file: slices/counterSlice.js

import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
}

// Начальное значение
const initialState: CounterState = {
  value: 0,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  // Редьюсеры в слайсах меняют состояние и ничего не возвращают
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Пример с данными
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const { increment, decrement, incrementByAmount } = newsSlice.actions;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default newsSlice.reducer;
