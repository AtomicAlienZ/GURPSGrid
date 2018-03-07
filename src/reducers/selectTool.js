export default function selectTool (state, action) {
  return {
    ...state,
    toolActive: action.tool !== state.toolActive ? action.tool : null,
  };
}
