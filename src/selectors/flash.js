export const getMessages = state => state.ids.map(id => state.data[id]);
