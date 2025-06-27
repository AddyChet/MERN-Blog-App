import axiosInstance from "../config/axiosInstance";

export const FilterPagination = async ({
  createNewArr = false,
  state,
  data,
  page,
  counteRoute,
  dataToSend = {},
  pageState,
}) => {
  let obj;

  // ✅ If state is null OR pageState changed OR we want a new array
  const isNewState =
    state === null ||
    createNewArr ||
    (state?.pageState && state.pageState !== pageState);

  if (!isNewState) {
    obj = {
      ...state,
      results: [...state.results, ...data],
      page,
    };
  } else {
    // Fetch count only for new/first fetch
    const { data: countData } = await axiosInstance.post(
      counteRoute,
      dataToSend
    );
    obj = {
      results: data,
      page: 1,
      totalDocs: countData.totalDocs,
      pageState: pageState, // ✅ Track which "pageState" (home/category)
    };
  }

  return obj;
};
