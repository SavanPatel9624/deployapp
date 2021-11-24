import {
  GET_HOME_DATA,
  GET_FOOTER_DATA,
  GET_COMPANY_PROFILE_DATA,
  GET_INFRASTRUCTURE_DATA,
  GET_MEDIA_DATA,
  GET_COLLECTION_DATA,
  GET_EXPORT_DATA,
  IS_FIRST_TIME,
} from "../constent";

export const eventReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_HOME_DATA:
      return {
        ...state,
        homeAllData: action.data,
      };
    case GET_FOOTER_DATA:
      return {
        ...state,
        footerData: action.data,
      };
    case GET_COMPANY_PROFILE_DATA:
      return {
        ...state,
        companyProfile: action.data,
      };
    case GET_INFRASTRUCTURE_DATA:
      return {
        ...state,
        infrastructure: action.data,
      };
    case GET_MEDIA_DATA:
      return {
        ...state,
        media: action.data,
      };
    case GET_COLLECTION_DATA:
      return {
        ...state,
        collection: action.data,
      };
    case GET_EXPORT_DATA:
      return {
        ...state,
        exportData: action.data,
      };

    case IS_FIRST_TIME:
      return {
        ...state,
        isFirstTimeLoad: action.data,
      };
    default:
      return state;
  }
};
