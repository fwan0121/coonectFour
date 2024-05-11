import { configureStore, createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    incremented: state => { state.value += 1; },
    decremented: state => { state.value -= 1; },
  },
});

const store = configureStore({
  reducer: counterSlice.reducer,
});

const { incremented, decremented } = counterSlice.actions;

function render() {
  const state = store.getState();
  document.getElementById('value').textContent = state.value;
}

render();
store.subscribe(render);

document.getElementById('increment').addEventListener('click', () => store.dispatch(incremented()));
document.getElementById('decrement').addEventListener('click', () => store.dispatch(decremented()));
