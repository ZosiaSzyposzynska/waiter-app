

const createActionName = actionName => `app/tables/${actionName}`;
export const SET_TABLES = createActionName('SET_TABLES');
export const UPDATE_TABLE = createActionName('UPDATE_TABLE');


const tablesReducer = (state = [], action) => {
  switch (action.type) {
    case SET_TABLES:
      return action.payload;
    case UPDATE_TABLE:
      return state.map((table) => {
          if (table.id === action.payload.id) {
            return action.payload;
          }
          return table;
        })

    default:
      return state;
  }
};

export const setTables = (tables) => ({
  type: SET_TABLES,
  payload: tables,
});

export const updateTable = (table) => ({
  type: UPDATE_TABLE,
  payload: table,
});




export default tablesReducer;